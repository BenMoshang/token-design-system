import type { Object3D, Vector3, Scene } from 'three';
import { threeStore } from './store';
import { get } from 'svelte/store';

export const getWorldPosition = (object: Object3D): Vector3 => {
	const position = new Vector3();
	object.getWorldPosition(position);
	return position;
};

export const disposeObject = (object: Object3D): void => {
	if (!object) return;

	// Dispose of geometries and materials
	if ('geometry' in object) {
		(object as any).geometry?.dispose();
	}

	if ('material' in object) {
		const materials = Array.isArray((object as any).material)
			? (object as any).material
			: [(object as any).material];

		materials.forEach((material) => material?.dispose());
	}

	// Recursively dispose of children
	object.children.forEach((child) => disposeObject(child));
};

export const removeFromScene = (object: Object3D): void => {
	const { scene } = get(threeStore);
	if (!scene || !object) return;

	disposeObject(object);
	object.removeFromParent();
};
