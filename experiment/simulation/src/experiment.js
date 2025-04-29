/** --------Controls and all functionalities of experiments defined here------- */

/** Function to set the environment and its respective value*/
function changeEnviornment(scope) {
	gravity_g = parseFloat(scope.environment);
	calculation(scope);
	needlePositionSettings();
	stage.update();
}
/** Function to set the thickness of ruler */
function thicknessOfBar(scope) {
	getChild("needle_zoom").y = needle_last_y;
	ruler_thicknes = parseFloat(scope.thickness);
	calculation(scope);
	needlePositionSettings();
	stage.update();
}
/** Function to set the material used for experiment */
function changeMaterial(scope) {
	material_value = parseFloat(scope.material);
	scope.breadth = 1;
	/** Initialy hide all material for each material selection */
	getChild("ruler_wood").alpha = getChild("ruler_aluminium").alpha = getChild("ruler_copper").alpha = getChild("ruler_steel").alpha = 0;
	switch ( material_value ) {
		case 1.1: /** This case execute when selected material is wood */
			getChild("ruler_over_material").scaleY = getChild("ruler_wood").scaleY = 1; /** To set breadth of material to initial state while breadth was changed */
			getChild("ruler_wood").alpha = 1; /** To display selected material */
			scope.material_index = 0; /** This value used to selected string of selected material from array and it uses in RESULT section */
			break;
		case 6.9: /** This case execute when selected material is aluminium */
			getChild("ruler_over_material").scaleY = getChild("ruler_aluminium").scaleY = 1; /** To set breadth of material to initial state while breadth was changed */
			getChild("ruler_aluminium").alpha = 1; /** To display selected material */
			scope.material_index = 1; /** This value used to selected string of selected material from array and it uses in RESULT section */
			break;
		case 11.7: /** This case execute when selected material is copper */
			getChild("ruler_over_material").scaleY = getChild("ruler_copper").scaleY = 1; /** To set breadth of material to initial state while breadth was changed */
			getChild("ruler_copper").alpha = 1; /** To display selected material */
			scope.material_index = 2; /** This value used to selected string of selected material from array and it uses in RESULT section */
			break;
		case 20:  /** This case execute when selected material is steel */
			getChild("ruler_over_material").scaleY = getChild("ruler_steel").scaleY = 1; /** To set breadth of material to initial state while breadth was changed */
			getChild("ruler_steel").alpha = 1; /** To display selected material */
			scope.material_index = 3; /** This value used to selected string of selected material from array and it uses in RESULT section */
			break;
	}
	calculation(scope);
	needlePositionSettings();
	stage.update();
}
/** Function to change the breadth of material */
function breadthOfBar(scope) {
	getChild("needle_zoom").y = needle_last_y;
	ruler_breadth = parseFloat(scope.breadth).toPrecision(2);
	switch ( material_value ) {
		case 1.1: /** To change the breadth of wood */
			getChild("ruler_over_material").scaleY = getChild("ruler_wood").scaleY = initial_breadth + ((ruler_breadth-1)/10);
			break;
		case 6.9: /** To change the breadth of aluminium */
			getChild("ruler_over_material").scaleY = getChild("ruler_aluminium").scaleY = initial_breadth + ((ruler_breadth-1)/10);
			break;
		case 11.7: /** To change the breadth of copper */
			getChild("ruler_over_material").scaleY = getChild("ruler_copper").scaleY = initial_breadth + ((ruler_breadth-1)/10);
			break;
		case 20: /** To change the breadth of steel */
			getChild("ruler_over_material").scaleY = getChild("ruler_steel").scaleY = initial_breadth + ((ruler_breadth-1)/10);
			break;
	}
	calculation(scope);
	needlePositionSettings();
	stage.update();
}
/** To set the mass on weight hanger */
function massOfWeight(scope) {
	mass = parseFloat(scope.mass);
	for ( i = 100; i <= mass; i = i + 50 ) { /** To show the number of weights */
		weight_container_left.getChildByName("weight_left_"+i).alpha = 1;
		weight_container_right.getChildByName("weight_right_"+i).alpha = 1;
	}
	for ( i = mass + 50 ; i <= 500; i = i + 50 ) { /** To hide the number of weight */
		weight_container_left.getChildByName("weight_left_"+i).alpha = 0;
		weight_container_right.getChildByName("weight_right_"+i).alpha = 0;
	}
	if ( scope.blade_distance > 10 ) {
		calculation(scope);
		needlePositionSettings();
	}	
	stage.update();
}
/** To set the distance between two weight hangers */
function distanceOfWeightHangersFn(scope) {
	/** If the distance between two weight hangers is greater than distance between edge of two blades+10, 
	the weight hanger distance slider value set as the current slider value else the slider value becomes 
	distance between edge of two blades+10 */
	if ( scope.weight_hangers_distance >= (scope.blade_distance+10) ) {
		scope.weight_hangers_distance = scope.weight_hangers_distance;
		stage.update();
	} else {
		scope.weight_hangers_distance = scope.blade_distance+10;
		stage.update();
	}
	weight_hangers_distance = parseFloat(scope.weight_hangers_distance-20);  /** This statment will set the distance between two weight hangers */
	weight_container_right.x = 410 + (scope.weight_hangers_distance-20) * 4.5;  /** To set the postion of right side weight hanger */
	weight_container_left.x = 265 - (scope.weight_hangers_distance-20) * 4.5;  /** To set the postion of left side weight hanger */
	calculation(scope);
	needlePositionSettings();
	stage.update();
}
/** To set the distance between edge of two blades */
function distanceOfBlade(scope) {
	/** If the distance between edge of two blades value is less than or equal to the distance between two weight hangers-10, 
	the distance between edge of two blades value set as the current slider value else the slider value becomes 
	distance between two weight hangers-10 */
	if ( scope.blade_distance <= (scope.weight_hangers_distance-10) ) {
		scope.blade_distance = scope.blade_distance;
		stage.update();
	} else {
		var _slider_val = scope.weight_hangers_distance-10;
		if ( _slider_val % 1 == 0 ) {
			scope.blade_distance = Number(_slider_val);
		} else {
			scope.blade_distance = parseFloat(_slider_val.toFixed(1));
		}
		stage.update();
	}
	getChild("stand_right").x = CENTER + scope.blade_distance * 4.5; /** To set the postion of right side blade */
	getChild("stand_left").x = CENTER - scope.blade_distance * 4.5; /** To set the postion of left side blade */
	calculation(scope);
	needlePositionSettings();
	stage.update();
}
/** Function to execute while in zoom-in effect of scale */
function scaleZoomIn(evt) {
	zoom_container.cursor = "none"; /** To hide curesor */
	stage.getChildByName("zoom_container").alpha = 1; /** To display the zoom effect of scale */
	stage.update();
}
/** Function to execute while in zoom-ot effect of scale */
function scaleZoomOut(evt) {
	stage.getChildByName("zoom_container").alpha = 0; /** Function to hide zoom-in effect of scale */	
	stage.update();
}
/** A fadout/fadin effect to get an interaction of right arrow click */
function rightDown(evt) {
	getChild("arrow_right").alpha = 0.7; /** Adjust the transparancy of arrow to get a click effect */
	stage.update();
}
function rightUp(evt) {
	getChild("arrow_right").alpha = 1; /** Adjust the transparancy of arrow to get a click effect */
	stage.update();
}
/** A fadout/fadin effect to get an interaction of left arrow click */
function leftDown(evt) {
	getChild("arrow_left").alpha = 0.7;  /** Adjust the transparancy of arrow to get a click effect */
	stage.update();
}
function leftUp(evt) {
	getChild("arrow_left").alpha = 1;  /** Adjust the transparancy of arrow to get a click effect */
	stage.update();
}
/** Function to handle events related to right arrow */
function arrowRightClick(scope, evt) {
	if ( right_rotation <= 500 ) {
		total_right_click++; /** To get the total number of right arrow click */
		if ( right_click ) {  /** This block of code will execute only if first right arrow click after the left arrow click */
	        zoom_rooler_initial_y = zoom_container.getChildByName("zoom_scale_ruler").y; /** current position of zoom scale and it used as next initial position of zoom scale */
	   		right_click = false; 
	        left_click = true;
	        rotation = 0;
	    }
	    right_rotation++; 
	    rotation++;
	    /** To reposition the zoom needle and 1.4 = 14/10 here we consider 1mm is equal to 14px
		10 arrow click is equal to 1mm in needle movement */
	    microscope_forward_adjust_dist = right_rotation * 0.45;	    
	    needlePositionSettings();
	    /** To reposition the zoom scale and 0.7 = 14/20 here we consider 1mm is equal to 14px
		20 arrow click is equal to 1mm in zoom scale movement */
	    zoom_container.getChildByName("zoom_scale_ruler").y = zoom_rooler_initial_y + (rotation * 0.7);
	    getChild("device_portion_3").y = lense_down_initial-(rotation * 0.14); /** To move lense of microscope upward/downward direction */
	    getChild("device_portion_5").y = lense_down_initial-(rotation * 0.14); /** To move lense of microscope upward/downward direction */
	    lense_up_initial = getChild("device_portion_5").y;
    }
    scope.$apply();
    stage.update();
}
/** Function to handle events related to right arrow */
function arrowLeftClick(scope, evt) {
	if ( total_right_click > -50 ) {
        total_right_click--;
        if ( left_click ) { /** This block of code will execute only if first left arrow click after the right arrow click */
            zoom_rooler_initial_y = zoom_container.getChildByName("zoom_scale_ruler").y;
            left_click = false;
            right_click = true;
            rotation = 0;
        }
        left_rotation++;
        rotation++;
        /** To reposition the zoom scale and 1.4 = 14/10 here we consider 1mm is equal to 14px
		10 arrow click is equal to 1mm in scale movement */
        microscope_backward_adjust_dist = left_rotation * 0.45;
        needlePositionSettings();
        /** To reposition the zoom scale and 0.7 = 14/20 here we consider 1mm is equal to 14px
		20 arrow click is equal to 1mm in zoom scale movement */
        zoom_container.getChildByName("zoom_scale_ruler").y =  zoom_rooler_initial_y - (rotation * 0.7);
        getChild("device_portion_3").y = lense_up_initial + (rotation * 0.14); /** To move lense of microscope upward/downward direction */
    	getChild("device_portion_5").y = lense_up_initial + (rotation * 0.14); /** To move lense of microscope upward/downward direction */
    	lense_down_initial = getChild("device_portion_5").y; /** To ge the current position of movable lense of microscope */
    }
    scope.$apply();
    stage.update();
}
/** Function to show zoom-in and zoom-out images and related actions */
function mouseMovement(evt){
	if ( evt.stageX > 5 && evt.stageX < 695 && evt.stageY > 5 && evt.stageY < 695 ){
        zoom_container.getChildByName("zoom_minus").alpha = 1;
    } else {
        zoom_container.getChildByName("zoom_minus").alpha = 0;
    }
    zoom_container.getChildByName("zoom_minus").x = evt.stageX - 10;
    zoom_container.getChildByName("zoom_minus").y = evt.stageY - 10;
    if ( evt.stageX > 360 && evt.stageX < 400 && evt.stageY > 240 && evt.stageY < 465 ) {
        scale_zoom_area.cursor  = "none";
        getChild("zoom_pluse").alpha = 1;
        getChild("zoom_pluse").x = evt.stageX - 10;
        getChild("zoom_pluse").y = evt.stageY - 10;
    } else {
        getChild("zoom_pluse").alpha = 0;
    }
    stage.update();
}
/** Function for calculate the equation */
function calculation(scope){
	medium_weight = (((scope.weight_hangers_distance/100)-(scope.blade_distance/100))/2).toFixed(3);
	/** Calculation of expression, e 𝑒=(3𝑚𝑔𝑝𝑙^2)/(2𝑏𝑑^3 𝑌) */
	var calc1 = (3 * (scope.mass/1000) * gravity_g * medium_weight * Math.pow((scope.blade_distance/100),2));
	var calc2 = (2 * (scope.breadth/100) * Math.pow( (scope.thickness/100),3 ) * material_value * Math.pow(10, 10));	
	expression_e = calc1 / calc2;
	expression_e = (expression_e * 100).toFixed(6);
	pin_distance_from_equation = expression_e * 100;
	stage.update();
}
/** Zoomed needle y positioning */
function needlePositionSettings() {
	getChild("needle_zoom").y =  initial_pin_position - pin_distance_from_equation + microscope_forward_adjust_dist - microscope_backward_adjust_dist;
}
/** Function for resetting the experiment */              
function resetExperiment(scope){
	initialisationOfControls(scope); /** Reset all variable to initial state */
	initialisationOfVariables();
	getChild("stand_left").x = 263; /** Set to initial position of right side blade */
	getChild("stand_right").x = 353; /** Set to initial positon of left side blade */
	stage.getChildByName("zoom_container").alpha = 0; /** To hide zoom view of scale */
	/** To set all materials to invisible except wood */
	getChild("ruler_steel").alpha = 0;
	getChild("ruler_copper").alpha = 0;
	getChild("ruler_aluminium").alpha = 0;
	getChild("ruler_wood").alpha = 1;
	zoom_container.getChildByName("zoom_scale_ruler").y = -511.5;
	getChild("device_portion_3").y = 0;
	getChild("device_portion_5").y = 0;
	getChild("needle_zoom").y = -20;
	weight_container_right.x = 410;
	weight_container_left.x = 265;
	stage.update();
}