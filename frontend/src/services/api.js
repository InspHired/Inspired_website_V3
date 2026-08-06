// frontend/src/pages/AdminDashboard.js - Update handleSaveAll

const handleSaveAll = async () => {
    setSaving(true);
    try {
        const updates = [];
        content.forEach(item => {
            if (editingContent[item.id] !== item.value) {
                updates.push({ 
                    id: item.id, 
                    value: editingContent[item.id],
                    table: item.table,
                    originalId: item.originalId,
                    originalKey: item.originalKey,
                    field: item.field  // ← Make sure this is included
                });
            }
        });

        if (updates.length === 0) {
            showMessage('No changes to save', 'info');
            setSaving(false);
            return;
        }

        showMessage(`Saving ${updates.length} changes...`, 'info');

        for (const update of updates) {
            await adminApi.updateContent(
                update.id, 
                update.value, 
                update.table, 
                update.originalId, 
                update.originalKey,
                update.field  // ← Pass the field
            );
        }

        showMessage(`✅ ${updates.length} changes saved successfully!`, 'success');
        await fetchContent();
    } catch (error) {
        showMessage('❌ Error saving changes', 'error');
        console.error('Save error:', error);
    } finally {
        setSaving(false);
    }
};