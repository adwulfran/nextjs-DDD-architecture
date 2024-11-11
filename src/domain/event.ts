export class Event {
    constructor(
        public id: string,
        public title: string,
        public format: 'physical' | 'online' | 'hybrid',
        public date: Date,
        public time: Date,
        public location: string,
        public maxCapacity: number,
        public description?: string,
        public participants?: unknown[]
    ) { }

    // Est-ce que l'évenement est complet ?
    isFull():boolean {
        return this.participants!.length >= this.maxCapacity;
    }
}