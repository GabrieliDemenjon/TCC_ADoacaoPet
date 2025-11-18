
import { Request, Response } from 'express';
import { getPetsCollection } from '../../infrastructure/database/mongo';
import { sanitize } from '../../shared/utils/sanitizer';

/**
 * List pets (simple)
 */
export async function listPetsController(req: Request, res: Response) {
  const pets = await getPetsCollection();
  const items = await pets.find({}).toArray();
  res.json(items);
}

/**
 * Create pet (simplified)
 */
export async function createPetController(req: Request, res: Response) {
  const { name, type, age } = req.body;
  const pets = await getPetsCollection();
  const doc = { name: sanitize(name), type: sanitize(type), age };
  const result = await pets.insertOne(doc);
  res.status(201).json({ id: result.insertedId, ...doc });
}
