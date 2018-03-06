"use strict";

import Observable from "./observable";
import ImageLoader from "./image-loader";
import JSONLoader from "./json-loader";
import {validateNullUndifined, validateEmptyString} from './validator';

const IMAGE = "Image";
const JSON = "JSON";

export default class AssetManager {
    constructor() {
      this._assetsToLoad = new Map();
      this._assets = new Map();
      this._promises = new Map();
      this._imageLoader = new ImageLoader();
      this._JSONLoader = new JSONLoader();
      this._observable = new Observable();
    }

    addImage(id, path) {
      this._addAsset(id, path, IMAGE);
    }

    addJSON(id, path) {
      this._addAsset(id, path, JSON);
    }

    @validateNullUndifined
    @validateEmptyString
    _addAsset(id, path, type) {
      this._assetsToLoad.set(id, {"path": path, "type": type});
    }

    loadAssets() {
      this._assetsToLoad.forEach(this._loadAsset, this);

      return Promise.all(this._promises.values()).then( (values ) => {
        for (let asset of values) {
          this._assets.set(asset.key, asset.value);
        }
        //console.log(this._assets);
        //this._observable.notify("all-assets-loaded");
      });
    }

    _loadAsset(value, key, map) {
      let asset = {key, "path" : value.path, "type": value.type};

      switch (asset.type) {
        case IMAGE: {
          this._promises.set(asset.key,
                             this._imageLoader.load(asset.key, asset.path));
          break;
        }
        case JSON: {
          this._promises.set(asset.key,
            this._JSONLoader.load(asset.key, asset.path));
          break;
        }
        default: {
          console.error(`Type ${asset.type} is not recognized`);
          return null;
        }
      }
    }

    get observable() {
      return this._observable;
    }

    get assets() {
      return this._assets;
    }
}
