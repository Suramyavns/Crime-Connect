import { Query,ID } from 'react-native-appwrite';
import { db, dbID } from '../../Appwrite';


/**
 * Creates a new document in the specified collection with auto-generated document ID.
 * @param {string} databaseId - The ID of the database.
 * @param {string} collectionId - The ID of the collection.
 * @param {Object} data - The data to be stored in the document.
 * @example
 * createDocument('db123', 'col456', { name: 'John Doe', age: 30 });
 */
export async function createComment(data) {
    try {
        return await db.createDocument(dbID, 'comment', ID.unique(), data);
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
}

/**
 * Retrieves a document by ID.
 * @param {string} databaseId - The ID of the database.
 * @param {string} collectionId - The ID of the collection.
 * @param {string} documentId - The ID of the document to fetch.
 * @example
 * getDocument('db123', 'col456', 'doc789');
 */
export async function getComment(documentId) {
    try {
        return await db.getDocument(dbID, 'comment', documentId);
    } catch (error) {
        console.error('Error fetching document:', error);
        throw error;
    }
}

/**
 * Updates an existing document.
 * @param {string} databaseId - The ID of the database.
 * @param {string} collectionId - The ID of the collection.
 * @param {string} documentId - The ID of the document to update.
 * @param {Object} data - The updated data for the document.
 * @example
 * updateDocument('db123', 'col456', 'doc789', { age: 31 });
 */
export async function updateComment(documentId, data) {
    try {
        return await db.updateDocument(dbID, 'comment', documentId, data);
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
}

/**
 * Deletes a document by ID.
 * @param {string} databaseId - The ID of the database.
 * @param {string} collectionId - The ID of the collection.
 * @param {string} documentId - The ID of the document to delete.
 * @example
 * deleteDocument('db123', 'col456', 'doc789');
 */
export async function deleteComment(documentId) {
    try {
        return await db.deletePost(dbID, 'comment', documentId);
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
}

/**
 * Lists all documents in a collection.
 * @param {string} databaseId - The ID of the database.
 * @param {string} collectionId - The ID of the collection.
 * @example
 * listDocuments('db123', 'col456');
 */
export async function listComments() {
    try {
        return await db.listDocuments(dbID, 'comment');
    } catch (error) {
        console.error('Error listing documents:', error);
        throw error;
    }
}

/**
 * Lists documents using filters.
 * @param {string} databaseId - The ID of the database.
 * @param {string} collectionId - The ID of the collection.
 * @param {Array} filters - Array of filter queries.
 * @example
 * listDocumentsWithFilter('db123', 'col456', [Query.equal('age', 30)]);
 */
export async function listCommentWithFilter(filters) {
    try {
        return await db.listDocuments(dbID, 'comment', filters);
    } catch (error) {
        console.error('Error listing documents with filters:', error);
        throw error;
    }
}

/**
 * Queries documents using a single condition.
 * @param {string} databaseId - The ID of the database.
 * @param {string} collectionId - The ID of the collection.
 * @param {string} field - The field to filter on.
 * @param {any} value - The value to match.
 * @example
 * queryDocuments('db123', 'col456', 'name', 'John Doe');
 */
export async function queryComment(field, value) {
    try {
        return await db.listDocuments(dbID, 'comment', [Query.equal(field, value)]);
    } catch (error) {
        console.error('Error querying documents:', error);
        throw error;
    }
}

/**
 * Queries documents using multiple conditions.
 * @param {string} databaseId - The ID of the database.
 * @param {string} collectionId - The ID of the collection.
 * @param {Array} conditions - Array of objects containing { field: string, value: any }.
 * @example
 * queryDocumentsWithMultipleConditions('db123', 'col456', [
 *   { field: 'name', value: 'John Doe' },
 *   { field: 'age', value: 30 }
 * ]);
 */
export async function queryCommentsWithMultipleConditions(conditions) {
    try {
        const queries = conditions.map(condition => Query.equal(condition.field, condition.value));
        return await db.listDocuments(dbID, 'comment', queries);
    } catch (error) {
        console.error('Error querying documents with multiple conditions:', error);
        throw error;
    }
}
