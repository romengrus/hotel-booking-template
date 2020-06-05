function factory(Component) {
  const id = Component.getID();
  const qs = `[data-${id}]`;
  const elements = document.querySelectorAll(qs);
  return [...elements].map(el => new Component(el));
}

export { factory };
