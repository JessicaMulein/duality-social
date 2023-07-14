export abstract class Orchestrator {
    async execute(...args: any[]): Promise<any> {
        throw new Error('Not implemented');
    }
}