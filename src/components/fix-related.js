export default function fix_related(things) {
  if (!things) return things;
  if (things[0] && things[0].value) return things;
  return things.map(function(t) {
    return { text: t.title, value: t.id };
  });
}
