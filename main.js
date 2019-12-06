$(document).ready(function(){
    var direction = 1;
    var addon = false;
    var forward = true;
    var points = 0;
    
    $('.btn-replay').click(function(){
        setTimeout(function(){
            $('.level-btn').fadeIn({duration:200,queue:false})
        },100)
        $('.main-box').fadeOut({duration:200,queue:false})
        $('.total-score').html('');
        $('.total-score').hide();
        $('.reset').hide();
        
        $('.level').html( `<h3>------------------</h3>`)
        $('.points').html( `<h3>------------------</h3>`)
        for(var i=0;i<li.length;i++){
            var v = parseInt(li[i]/100);
            var h = li[i]%100;
            $(`#v${vh(v)}h${vh(h)}`).removeClass('snake-tail');
            $(`#v${vh(v)}h${vh(h)}`).removeClass('snake-head');
        }
        direction = 1;
        addon = false;
        forward = true;
        points = 0;
    })
    function start(time , li){
        setTimeout(function(){
            var id = $('.snake-head').attr('id');
            if(id){
                $(`#${id}`).removeClass('snake-head');
            }
            var last_head = li[0];
            var last_tail = li[li.length - 1];
            var v_head = parseInt(last_head/100);
            var h_head = last_head%100;
            for(var i=0;i<li.length;i++){
                var v = parseInt(li[i]/100);
                var h = li[i]%100;
                // console.log(v,h);
                if(i<li.length-1) $(`#v${vh(v)}h${vh(h)}`).addClass('snake-tail');
                else{
                    if(addon) {
                        $(`#v${vh(v)}h${vh(h)}`).addClass('snake-tail');
                        addon = false;
                    }
                    else $(`#v${vh(v)}h${vh(h)}`).removeClass('snake-tail');
                }
            }
            if(direction === 0){//move up
                id_new_head = `v${vh(v_head-1)}h${vh(h_head)}`;
                li.unshift(parseInt(`${vh(v_head-1)}${vh(h_head)}`));
                if(v_head-1 === -1){
                    forward = false;
                }
                // console.log(last_head , last_tail , v_head , h_head);
            }
            else if(direction === 1){//move right
                id_new_head = `v${vh(v_head)}h${vh(h_head+1)}`
                li.unshift(parseInt(`${vh(v_head)}${vh(h_head+1)}`))
                if(h_head+1 === 20){
                    forward = false;
                }
                // console.log(last_head , last_tail , v_head , h_head);
            }
            else if(direction === 2){//move bottom
                id_new_head = `v${vh(v_head+1)}h${vh(h_head)}`
                li.unshift(parseInt(`${vh(v_head+1)}${vh(h_head)}`));
                if(v_head+1 === 20){
                    forward = false;
                }
                // console.log(last_head , last_tail , v_head , h_head);
            }
            else if(direction === 3){//move left
                id_new_head = `v${vh(v_head)}h${vh(h_head-1)}`
                li.unshift(parseInt(`${vh(v_head)}${vh(h_head-1)}`))
                if(h_head-1 === -1){
                    forward = false;
                }
                // console.log(last_head , last_tail , v_head , h_head);
            }
            // console.log(`${vh(random_v)}${vh(random_h)}` , li[0]);
            if(`${vh(random_v)}${vh(random_h)}` == li[0]){
                $('.snake-food').removeClass('snake-food');
                random_v = Math.floor(20*Math.random());
                random_h = Math.floor(20*Math.random());
                $(`#v${vh(random_v)}h${vh(random_h)}`).addClass('snake-food')
                points+=10;
                update_points();
            }
            else{
                li.pop();
            }
            for(var i =1;i<li.length;i++){
                if(li[0]==li[i]){
                    forward = false;
                }
            }
            $(`#${id_new_head}`).addClass('snake-head');
            if(forward) start(time , li);
            else{
                setTimeout(function(){
                    setTimeout(function(){
                        $('.danger-border').prepend(`<div class="total-score">Your total score = ${points}`);
                        
                        $('.reset').show();
                    },1000)
                    $('.each-box').fadeOut({duration:1000,queue:false})
                },1000)
            }
            
        },time);
    
    }  
    
    function update_points(){
        $('.points').html( `<h3>Points:<b>${points}</b></h3>`)
       
    }
    for(var i=0;i<20;i++){
        for(var j=0;j<20;j++){
            var i1 = vh(i);
            var j1 = vh(j);
            $('.danger-border').append(`<div class="each-box" id="v${i1}h${j1}"></div>`)
        }
    }
    function vh(i){
        // console.log('called');
        var i1;
        if(i<10){
            i1= `0${i}`;
        }
        else{
            i1=i;
        }
        return i1;
    }
    li = [1010,1110];
    
    $(document).keydown(function(){
        if(event.keyCode === 38){//up
            if(direction!==2) direction = 0;
        }
        else if(event.keyCode === 39){//right
            if(direction!==3) direction = 1;
        }
        else if(event.keyCode === 40){//down
            if(direction!==0) direction = 2;
        }
        else if(event.keyCode === 37){//left
            if(direction!==1) direction = 3;
        }
        
    })
    var random_v = Math.floor(20*Math.random());
    var random_h = Math.floor(20*Math.random());    
    $(`#v${vh(random_v)}h${vh(random_h)}`).addClass('snake-food')
   // console.log(random_h,random_v);
    $('.btn').click(function(){
        var id = $(this).attr('id');
        var level = parseInt(id.substr(6))
        time = 1000/level;
            if(time<=250) time-=100;
        console.log(time,li);
        
        $('.level-btn').fadeOut({duration:200,queue:false})
        setTimeout(function(){
            $('.level').html( `<h3>Level:<b>${level}</b></h3>`)
            update_points();
            li = [1010,1110];
            start(time , li);
            $('.main-box').fadeIn({duration:200,queue:false})
            $('.each-box').fadeIn({duration:200,queue:false})
        },200)
        
    })
})



