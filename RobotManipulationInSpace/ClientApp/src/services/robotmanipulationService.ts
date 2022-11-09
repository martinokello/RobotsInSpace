import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RobotManipulationService {

    private baseServerUrl: string = 'https://localhost:44319';
    private postSetUpPlaneAndRobotsOnServerUrl: string = this.baseServerUrl + '/Home/SetUpPlaneAndRobots';
    constructor(private httpClient: HttpClient) {

    }
    addRobot($event) {

    }

    public postPlaneAndRobotsThenExecute(plane: IPlane,robots:IRobot[]): Observable<any> {
        let roversModel = { plane: plane, robots: robots };
        let body = JSON.stringify(roversModel);

        const headers = new HttpHeaders({ 'content-type': 'application/json' });

        let requestOptions: any = {
            url: this.postSetUpPlaneAndRobotsOnServerUrl,
            headers: headers,
            body: body
        };
        return this.httpClient.post(requestOptions.url, requestOptions.body, { 'headers': requestOptions.headers }).pipe(map(res => {
            // doSomething 
            return res;
        }));

    }

}

export interface ICoordinate { X: number, Y: number }

export interface IPlane {
    width: number;
    height: number;
    origin: ICoordinate
}

export interface IRobot{
    location: ICoordinate;
    instructions: string;
    orientation: string;
}

export interface IRobotResult{
    robots: IRobot[];
    message: string;
}

