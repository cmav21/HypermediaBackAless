import { Router } from 'express';
import connect from "../database";
import { ObjectID } from "mongodb";

const router = Router();

router.get('/', async(req, res) => {
    const db = await connect();
    const result = await db.collection('todo').find({}).toArray();
    res.json(result); 
});

router.post('/', async(req, res) => {
    const db = await connect();
    const data = {
        description: req.body.description 
    };
    const result = await db.collection('todo').insertOne(data);
    res.json(result);
});

router.put('/:id', async(req, res) => {
    const db = await connect();
    const { id } = req.params;
    const data = {
        description: req.body.description 
    };
    const result = await db.collection('todo').updateOne({_id: ObjectID(id)}, {$set: data});
    res.json({
        message: `todo ${id} updated`,
        result
    });
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('todo').deleteOne({_id: ObjectID(id)});
    res.json({
        message: `Todo ${id} deleted`,
        result
    });
});

export default router;