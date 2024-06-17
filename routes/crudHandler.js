const express = require('express');

// Creation CRUD generic pour toute entite
function createCrudRoutes(model) {
    const router = express.Router();

    // Nouvelle element
    router.post('/', async (req, res) => {
        try {
            const newItem = new model(req.body);
            await newItem.save();
            res.status(201).json(newItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // lister tous les elements de l'entite
    router.get('/', async (_, res) => {
        try {
            const items = await model.find();
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Affiche un element par ID
    router.get('/:id', getEntity, (_, res) => {
        res.json(res.entity);
    });

    // Mettre a jour l'element avec l'ID
    router.put('/:id', getEntity, async (req, res) => {
        try {
            Object.assign(res.entity, req.body);
            const updatedEntity = await res.entity.save();
            res.json(updatedEntity);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // suprime element par ID
    router.delete('/:id', getEntity, async (_, res) => {
        try {
            await res.entity.remove();
            res.json({ message: 'Entity deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Middleware pour element by ID
    async function getEntity(req, res, next) {
        let entity;
        try {
        entity = await model.findById(req.params.id);
        if (!entity) {
            return res.status(404).json({ message: 'Cannot find entity' });
        }
        } catch (err) {
        return res.status(500).json({ message: err.message });
        }
        res.entity = entity;
        next();
    }

    return router;
}

module.exports = createCrudRoutes;