export class TensionLayer extends PlaceablesLayer {
  constructor() {
    super();
  }

  static get layerOptions() {
    return foundry.utils.mergeObject(super.layerOptions, {
      name: "TensionLayer",
      canDragCreate: false,
      zIndex: 180
    });
  }

  static documentName = "Note";
}