export function checkMapInstance(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    if (!this.isExistMapInstance()) {
      console.warn("Нет инстанса карты");
      return;
    }
    return originalMethod.apply(this, args);
  };

  return descriptor;
}
