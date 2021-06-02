
# Nautilus

Nautilus provides a simple syntax for querying objects.

## Example

To build a pipeline simply call the search function, give it an object and apply query functions, after the pipeline is constructed it can be evaluated.

```js
let obj = {a: 10, b: {a: [23, 45]}, c: 12};
// it can handle any nested structure of lists and objects
let pipeline = search(obj).all().oftype('number');
// the query is not applied until an evaluation function is called
console.log(pipeline.evaluateWith(Math.max, 0));
// returns 45
```

## API

- `Nautilus.search(obj)`: returns a `pipeline` with the given object as search space.

### Query Functions

All query functions are applied on the search space and return a new pipeline with the resulting search space

- `pipeline.key(k)`: each item in the search space that is an object and has key 'k' is replaced with item[k] otherwise the item is removed from the search space.
- `pipeline.matchAll()`: each item in the search space that is an object is replaced with all child values otherwise the item is removed from the search space.
- `pipeline.all()`: each item in the search space is recursively opened and all children are added to the search space. (can result in an expensive evaluation)
- `pipeline.list()`: each item in the search space that is a list is replaced by its values otherwise the item is removed from the search space.
- `pipeline.oftype(t)`: culls search space to only items of type t.
- `pipeline.select(f)`: culls search space to only items where `f(t) == true`.
- `pipeline.where(f)`: replaces every item in search space by `f(item)`.
- `pipeline.custom(f)`: applies custom query function (see source for examples).

### Evaluation Functions

- `pipeline.evaluateAll()`: gets all items in the search space.
- `pipeline.evaluateFirst()`: gets the first (or technically last) item in the search space.
- `pipeline.evaluateWith(f, s)`: evaluates search space with reduction function `f(res, cur)` and start value s.
