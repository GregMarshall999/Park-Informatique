const express = require('express');

function createCrudRoutes(model) {
    const router = express.Router();

    // Create
    router.post('/', async (req, res) => {
        try {
            const item = await model.create(req.body);
            res.status(201).json(item);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // List all
    router.get('/', async (_, res) => {
        try {
            const items = await model.findAll();
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Get
    router.get('/:id', async (req, res) => {
        try {
            const item = await model.findByPk(req.params.id);
            if (!item) return res.status(404).json({ message: 'Not Found' });
            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Update
    router.put('/:id', async (req, res) => {
        try {
            const [updated] = await model.update(req.body, { where: { id: req.params.id } });
            if (!updated) return res.status(404).json({ message: 'Not Found' });
            const updatedItem = await model.findByPk(req.params.id);
            res.json(updatedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Delete
    router.delete('/:id', async (req, res) => {
        try {
            const deleted = await model.destroy({ where: { id: req.params.id } });
            if (!deleted) return res.status(404).json({ message: 'Not Found' });
            res.json({ message: 'Deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    return router;
}

module.exports = createCrudRoutes;