import {GoogleMapComponent} from "./google-map";
/**
 * Created by mjaric on 10/3/16.
 */

export interface IOptionalSetMapMethod {
    setMap?(map: google.maps.Map):void;
}

export abstract class BaseGoogleMapComponent<T extends IOptionalSetMapMethod> {

    protected proxy:Promise<T>;
    protected proxyResolver:(googleMapEntity:T)=> void;

    protected mapComponent: GoogleMapComponent = null;
    protected delay:number;

    constructor(){
        this.proxy = new Promise(resolve => this.proxyResolver = resolve);
    }

    hasMapComponent(): boolean {
        return !!this.mapComponent;
    }

    setMapComponent(component: GoogleMapComponent, map: google.maps.Map): void {
        this.mapComponent = component;
        this.proxy.then((googleApiEntity:T) => setTimeout(() => googleApiEntity.setMap && googleApiEntity.setMap(map), this.delay || 0));
    }
}