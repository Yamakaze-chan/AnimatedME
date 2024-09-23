//Init data
let animations_list = {}
$.getJSON( "animations_list.json", function(data) {
    animations_list = data
    })

//Preview input
$("#element").change(function(){
    $("#preview_animation_object").html($("#element").val());
})

//Add animation li
function add_animations() {
    let temp_selected_id = Date.now();
    $('#ul_animations').append(`
        <li id=${temp_selected_id} class="ANIMATION_NO relative border-b border-gray-200">
            <button type="button" class="w-full px-6 py-6 text-left" @click="selected !== ${temp_selected_id} ? selected = ${temp_selected_id} : selected = null">
            <div class="flex items-center justify-between">
            <a class="z-10" onclick="remove_animations(this)" @click="selected = null"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></a>
            <input class="NAME" class="ANIMATION_NAME border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mx-8" placeholder="Name of animation" value="Animation No.${$('#ul_animations li.ANIMATION_NO').length+1}">
            <svg :class="{'transform rotate-180' : selected == ${temp_selected_id}}" class="w-5 h-5 text-gray-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 9l-7 7-7-7"></path></svg>
            </div>
            </button>
            <div class="relative overflow-hidden transition-all max-h-0 duration-700" x-ref="container${temp_selected_id}" x-bind:style="selected == ${temp_selected_id} ? 'max-height: ' + $refs.container${temp_selected_id}.scrollHeight + 'px' : ''">
            <div class="px-6 pb-6">
            <form class="max-w-sm mx-auto">
                <label for="ANIMATION" class="block mb-2 text-sm font-medium text-gray-900">Animation:</label>

            <div class="flex items-center justify-center">
            <div
                x-data="{ open: false, selected: ''}"
                @click.away="open = false"
                class="ANIMATION w-full relative"
            >
                <!-- Button -->
                <button
                type="button"
                @click="open = !open; close_animations_list()"
                class="w-full px-4 py-2 border border-gray-300 rounded flex items-center justify-between"
                :class="{'text-black': selected !== '', 'text-gray-500': selected === ''}"
                >
                <span
                    class="ANIMATION_VALUE overflow-hidden"
                    x-text="selected === '' ? 'Select an option' : selected"
                ></span>
                <svg
                    class="ml-2 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                    />
                </svg>
                </button>

                <!-- Dropdown Menu -->
                <div
                x-show="open"
                class="absolute mt-2 bg-white border rounded w-full max-h-96 overflow-y-scroll no-scrollbar z-10"
                x-cloak
                >
                <ul
                    class="h-full overflow-auto [&>li]:text-gray-500 [&>li]:px-4 [&>li]:py-2 [&>li]:cursor-pointer"
                >

                </ul>
    </div>
  </div>
</div>

                <label for="DURATION" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Duration (second):</label>
                <input type="number" name="DURATION" class="DURATION [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" value=1>
                <label for="TIMING_FUNCTION" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Timing Function:</label>
                <select class="TIMING_FUNCTION bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onchange="setValueofTIMING_FUNCTION(this)">
                <optgroup label="Native">
                    <option value="linear">Linear</option>
                    <option>Ease</option>
                    <option>Ease-In</option>
                    <option>Ease-Out</option>
                    <option>Ease-In-Out</option>
                </optgroup>
                <optgroup label="Make your own">
                    <option value="cubic-bezier">Cubic-Bezier</option>
                    <option>Steps</option>
                </optgroup>
                <optgroup label="Penner Equations">
                    <option>Cubic-Bezier</option>
                </optgroup>
                </select>
                <label class="pt-3 block mb-2 text-sm font-medium text-gray-900">Timing Function Values:</label>
                <input type="text" class="TIMING_FUNCTION_VALUES [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 mt-2.5" disabled onchange="validateTIMING_FUNCTION_VALUES(this)">
                <div>

                </div>
                <label for="DELAY" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Delay (second):</label>
                <input type="number" name="DELAY" class="DELAY [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" value=0>
                <label for="ITERATION" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Iteration:</label>
                <div class="w-full flex justify-center relative" name="ITERATION">
                <input type="number" class="NOT_INF_ITERATION [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" value=1>
                <label class=" inline-flex items-center ml-3 cursor-pointer">
                    <input type="checkbox" value="" class="INF_ITERATION sr-only peer" onchange="get_iteration(this)">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900">Infinity</span>
                </label>
                </div>
                <label for="DIRECTION" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Direction:</label>
                <select class="DIRECTION bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option>Normal</option>
                <option>Reverse</option>
                <option>Alternate</option>
                <option>Alternate-reverse</option>
                </select>
                <label for="FILL_MODE" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Fill Mode:</label>
                <select class="FILL_MODE bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option>None</option>
                <option>Forwards</option>
                <option>Backwards</option>
                <option>Both</option>
                </select>
            </form>
            </div>
            </div>
        </li>
        `);
        add_animations_to_option(temp_selected_id);
}

//Toggle list of animations
function toggle_animations_list(a) {
    $(".sub-menu > ul").not($(a).parent(".sub-menu").children("ul")).slideUp("100");
    $(".right").not($(a).find(".right")).removeClass('fa-caret-up').addClass('fa-caret-down');
	$(a).parent(".sub-menu").children("ul").slideToggle("100");
	$(a).find(".right").toggleClass("fa-caret-up fa-caret-down");
}
function close_animations_list(){
    $(".sub-menu > ul").slideUp("100");
    $(".right").removeClass('fa-caret-up').addClass('fa-caret-down');
}

//Remove animation
function remove_animations(a){
    $(a).parent().parent().parent().remove();
}

//change infinity iteration and back
function get_iteration(a){
    $(a).parent().parent().find('.NOT_INF_ITERATION').attr('disabled', function (_, attr) { return !attr });
}

//Get all animations
function get_animations(){
    list_of_animations = [];
    $("#ul_animations > li").each(function(_, li){
            let animation_name = $(li).find('.ANIMATION_NAME').val()
            let animation = $(li).find('.ANIMATION').find('button').find('.ANIMATION_VALUE').text().replaceAll(" ","-")
            // console.log($(li).find('.ANIMATION').find('button').find('.ANIMATION_VALUE').text())
            let duration = $(li).find('.DURATION').val()
            let timing_function = $(li).find('.TIMING_FUNCTION').find(":selected").val()
            let timing_function_values = $(li).find('.TIMING_FUNCTION_VALUES').val()
            let delay = $(li).find('.DELAY').val()
            let iteration = $(li).find('.peer').is(":checked") ? "infinite" : $(li).find('.NOT_INF_ITERATION').val()
            let direction = $(li).find('.DIRECTION').val()
            let fill_mode = $(li).find('.FILL_MODE').val()
            list_of_animations.push((duration + "s " + timing_function + timing_function_values + " " + delay + "s " + iteration + " " + direction + " " + fill_mode + " running " + animation).toLowerCase())
        })
        let ani_str = list_of_animations.join(", ")
        console.log(list_of_animations)
        document.getElementById("preview_animation_object").style.animation = 'none';
        document.getElementById("preview_animation_object").offsetHeight; /* trigger reflow */
        document.getElementById("preview_animation_object").style.animation = ani_str;
    }


//Get all available animations
function getAnimationList(css_id){
    // Return a list of all of the animation keyframes in all style sheets.
        var ss = $(css_id)[0].sheet;
        var anims = [];
            if (ss.cssRules) {
                // loop through all the rules
                for (var r = 0; r <ss.cssRules.length; r++) {
                    var rule = ss.cssRules[r];
                    if ((rule.type === window.CSSRule.KEYFRAMES_RULE || rule.type === window.CSSRule.WEBKIT_KEYFRAMES_RULE)) {
                        anims.push(rule);
                    }
                }
            }
        return anims;
    };
    
// Get animations's name
function getAnimationName(css_id){
    animList = getAnimationList(css_id);
    animList_name = [];
    for (var a = 0; a < animList.length; a++) {
        animList_name.push(animList[a].name)
    };
    return [...new Set(animList_name)];
}

//add animations to option groups
function add_animations_to_option(id){
    var animation_ul = $('#'+id).find('.ANIMATION').find('div').find('ul');
    for (let animation_type in animations_list) {
        animation_ul.append(`<li><ul>
            <li id="${animation_type}" class='sub-menu'>
            <a onclick="toggle_animations_list(this)">${animation_type.toUpperCase()}
                <div class='fa fa-caret-down right'></div>
            </a>
			<ul style="display: none">
            </ul>
            </li>
            </ul></li>`); 
        for (let animation in animations_list[animation_type]){
            animation_li_str = "";
            // console.log(animations_list[animation_type][animation])
            for (let animation_name in animations_list[animation_type][animation]){
            animation_li_str +=`
            <li @click="selected = '`+animations_list[animation_type][animation][animation_name].replaceAll("-"," ")+`'; open = false; open_`+animation.replaceAll("-","_")+` = false">
            `+animations_list[animation_type][animation][animation_name].replaceAll("-"," ")+`
            </li>
            `
        }
        $("#" + animation_type + " > ul").append(`
            <li>
                        <div class="py-2 flex items-center justify-center">
                        <div
                            x-data="{ open_${animation.replaceAll("-","_")}: false}"
                            @click.away="open_${animation.replaceAll("-","_")} = false ;"
                            class="w-full relative"
                        >

                            <!-- Button -->
                            <button
                            type="button"
                            @click="open_${animation.replaceAll("-","_")} = !open_${animation.replaceAll("-","_")}"
                            class="w-full px-4 py-2 border border-gray-300 rounded flex items-center justify-between"
                            >
                            <span
                                class="overflow-hidden"
                            >${animation}</span>
                            <svg
                                class="ml-2 w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                                />
                            </svg>
                            </button>

                            <!-- Dropdown Menu -->
                            <div
                            x-show="open_${animation.replaceAll("-","_")}"
                            class="absolute mt-2 bg-white border rounded w-full z-10"
                            x-cloak
                            >
                            <ul
                                class="max-h-[140px] overflow-auto [&>li]:text-gray-500 [&>li]:px-4 [&>li]:py-2 hover:[&>li]:bg-gray-100 [&>li]:cursor-pointer"
                            >
                                `+animation_li_str+`
                            </ul>
                            </div>
                        </div>
                        </div>
                    </li>
            `)
        }
    }
}

//On change event of TIMING_FUNCTION
function setValueofTIMING_FUNCTION(a){
    // console.log($(a).find(":selected").val())
    if($(a).find(":selected").val().toLowerCase() == "cubic-bezier"){
        $(a).parent().find('.TIMING_FUNCTION_VALUES').prop("disabled", false)
        if($(a).parent().find('.TIMING_FUNCTION_VALUES').val() == ""){$(a).parent().find('.TIMING_FUNCTION_VALUES').val("\(0.1, 0.7, 1.0, 0.1\)")}
    }
    else if($(a).find(":selected").val().toLowerCase() == "steps"){
        $(a).parent().find('.TIMING_FUNCTION_VALUES').prop("disabled", false)
        if($(a).parent().find('.TIMING_FUNCTION_VALUES').val() == ""){$(a).parent().find('.TIMING_FUNCTION_VALUES').val("\(10, end\)")}
    }
    else{
        $(a).find('.TIMING_FUNCTION_VALUES').prop('disabled', true)
        $(a).parent().find('.TIMING_FUNCTION_VALUES').val("")
    }
    validateTIMING_FUNCTION_VALUES(a);
}

//validate value of TIMING_FUNCTION_VALUES
function validateTIMING_FUNCTION_VALUES(a){
    let value = $(a).parent().find('.TIMING_FUNCTION_VALUES').val().toLowerCase().replace(/^\D+|\D+$/g, "").replace(' ','').split(',')
    if (((value.length!=4) && $(a).parent().find('.TIMING_FUNCTION').find(":selected").val().toLowerCase()=="cubic-bezier") || ((value.length!=1 && value.length != 2) && $(a).parent().find('.TIMING_FUNCTION').find(":selected").val().toLowerCase()=="steps")){
        console.log(value)
        $(a).parent().find('.TIMING_FUNCTION_VALUES').removeClass("border-gray-300").addClass("border-red-300")
    }
    else{
        $(a).parent().find('.TIMING_FUNCTION_VALUES').removeClass("border-red-300").addClass("border-gray-300")
    }
}