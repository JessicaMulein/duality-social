export class Transformer<T, U> {
    transform(model: T): U {
        return model as unknown as U;
    }
}