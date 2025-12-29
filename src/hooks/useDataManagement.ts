import { useAppStore } from '../store/useAppStore';

interface BackupData {
    version: number;
    timestamp: string;
    data: {
        courseStatus: Record<string, 'pending' | 'regular' | 'approved'>;
        careerId: string;
        selectedElectives: Record<string, string>;
        examPlan: Record<string, string[]>;
        notes: Record<string, string>;
        calendarEvents: Record<string, string[]>;
    };
}

export const useDataManagement = () => {
    const state = useAppStore();

    const exportData = () => {
        const backup: BackupData = {
            version: 1,
            timestamp: new Date().toISOString(),
            data: {
                careerId: state.careerId,
                courseStatus: state.courseStatus,
                selectedElectives: state.selectedElectives,
                examPlan: state.examPlan,
                notes: state.notes,
                calendarEvents: state.calendarEvents,
            },
        };

        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `planificador-fio-backup-${state.careerId}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const importData = (file: File): Promise<{ success: boolean; message: string }> => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    const parsed = JSON.parse(content) as any;

                    if (!parsed || typeof parsed !== 'object' || !parsed.data) {
                        resolve({ success: false, message: 'Archivo inválido o corrupto.' });
                        return;
                    }

                    const data = parsed.data;

                    if (!data.careerId || !data.courseStatus) {
                        resolve({ success: false, message: 'Faltan datos críticos en el archivo.' });
                        return;
                    }

                    if (typeof data.courseStatus !== 'object') {
                        resolve({ success: false, message: 'El historial de materias es inválido.' });
                        return;
                    }

                    state.loadBackup({
                        careerId: String(data.careerId),
                        courseStatus: data.courseStatus,
                        selectedElectives: data.selectedElectives || {},
                        examPlan: data.examPlan || {},
                        notes: data.notes || {},
                        calendarEvents: data.calendarEvents || {},
                    });

                    resolve({ success: true, message: 'Datos restaurados correctamente.' });
                } catch (error) {
                    console.error(error);
                    resolve({ success: false, message: 'Error al procesar el archivo JSON.' });
                }
            };

            reader.readAsText(file);
        });
    };

    return { exportData, importData };
};
