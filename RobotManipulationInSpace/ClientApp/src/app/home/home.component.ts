import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPlane, IRobot, IRobotResult, RobotManipulationService } from '../../services/robotmanipulationService';

declare var jQuery: any;


@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [RobotManipulationService]
})
export class HomeComponent implements OnInit {
    numberOfRows: number = 6;
    numberOfCols: number = 6;
    widthOfPath: number = 10;
    heightOfPath: number = 10;
    numberOfRobots: number = 0;
    plane: IPlane;
    robots: IRobot[];
    robotInstruction: string;
    robotX: number;
    robotY: number;
    orientation: string;

    constructor(private _robotManipulationService: RobotManipulationService) {

    }

    ngOnInit(): void {
        this.robots = [];
    }
    drawPlane($event): void {
        jQuery('div#plane-wrapper').attr('width','800px');
        jQuery('div#plane-wrapper').attr('height', '800px');
        let viewportWidth: number = parseInt(jQuery('div#plane-wrapper').attr('width'));
        let viewportHeight:number = parseInt(jQuery('div#plane-wrapper').attr('height'));

        let widthOfPath = viewportWidth / this.numberOfRows;
        let heightOfPath = viewportHeight / this.numberOfCols;

        this.clearPlane();

        for (let y = this.numberOfCols; y >= 1; --y) {
            for (let x = 1; x <= this.numberOfRows; x++) {

                let div = document.createElement('div');
                jQuery(div).attr('id', `row${x}${y}`);
                jQuery(div).html('&nbsp;');
                jQuery(div).css('width', `${widthOfPath.toString()}px`);
                jQuery(div).css('height', `${heightOfPath.toString()}px`);
                jQuery(div).css('display', 'inline-block');
                jQuery(div).css('text-align', 'center');
                jQuery(div).css('border', 'gray thin solid');
                jQuery(div).css('position', 'relative');
                jQuery(div).addClass('center');
                jQuery('div#plane-wrapper').append(div);
            }
            jQuery('div#plane-wrapper').append('<br/>');
        }
        alert('Plane Drawn');
        $event.preventDefault();
    }

    addRobot($event) {
        debugger;
        let robot: IRobot = {
            location: { x: this.robotX, y: this.robotY },
            instructions: this.robotInstruction,
            orientation: this.orientation
        };
        this.placeRobotOnPlane(robot,'start');
        this.robots.push(robot);
        $event.preventDefault();
    }

    postPlaneAndRobotsThenExecute($event) {

        this.plane = {
            width: this.numberOfRows, height: this.numberOfCols, origin: {x: 0, y: 0 }
        }
        let resultObs: Observable<any> = this._robotManipulationService.postPlaneAndRobotsThenExecute(this.plane, this.robots);

        resultObs.pipe(map(res => {
            let results: IRobotResult = res as IRobotResult;
            if (!res.message) {
                this.clearPlane();
                this.drawPlane($event);
                for (let n = 0; n < results.robots.length; n++) {
                    this.placeRobotOnPlane(results.robots[n],'end');
                }
            }
        })).subscribe();
        $event.preventDefault();
    }

    clearPlane() {
        jQuery('div#plane-wrapper div').remove();
    }

    placeRobotOnPlane(robot: IRobot, startOrEnd) {
        if (startOrEnd == 'start') {
            alert(`Robot Facing: ${robot.orientation}, Start Location: ${robot.location.x}, ${robot.location.y}`);
            jQuery(`div#plane-wrapper div#row${robot.location.x}${robot.location.y}`).addClass('start');
            jQuery(`div#plane-wrapper div#row${robot.location.x}${robot.location.y}`).html(`start: ${robot.location.x}, ${robot.location.y}: ${robot.orientation}`);
        }
        else if (startOrEnd == 'end') {
            alert(`Robot Facing: ${robot.orientation}, End Location: ${robot.location.x}, ${robot.location.y}`);
            jQuery(`div#plane-wrapper div#row${robot.location.x}${robot.location.y}`).addClass('end');
            jQuery(`div#plane-wrapper div#row${robot.location.x}${robot.location.y}`).html(`end: ${robot.location.x}, ${robot.location.y}: ${robot.orientation}`);
        }
        /*using switch statements to add jpeg of arrows facing the robot orientation in future enhancements, Otherwise for this no switch not required due to same code*/
        /*switch (robot.orientation) {
            case 'N':
                if (startOrEnd == 'start') {
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).addClass('start');
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).html(`start: ${robot.location.X}${robot.location.Y}`);
                }
                else {

                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).addClass('end');
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).html(`end: ${robot.location.X}${robot.location.Y}`);
                }
                break;
            case 'E':
                if (startOrEnd == 'start') {
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).addClass('start');
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).html(`start: ${robot.location.X}${robot.location.Y}`);
                }
                else {

                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).addClass('end');
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).html(`end: ${robot.location.X}${robot.location.Y}`);
                }
                break;
            case 'S':
                if (startOrEnd == 'start') {
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).addClass('start');
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).html(`start: ${robot.location.X}${robot.location.Y}`);
                }
                else {

                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).addClass('end');
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).html(`end: ${robot.location.X}${robot.location.Y}`);
                }
                break;
            case 'W':
                if (startOrEnd == 'start') {
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).addClass('start');
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).html(`start: ${robot.location.X}${robot.location.Y}`);
                }
                else {

                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).addClass('end');
                    jQuery(`div#plane-wrapper div#row${robot.location.X}${robot.location.Y}`).html(`end: ${robot.location.X}${robot.location.Y}`);
                }
                break;
            }*/
    }
}
