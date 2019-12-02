function lg(arr) {

  var result = '---NOT ARRAY---';
  if (arr) result = _printf(arr); // --- формируем строку из массива
  _openWindow(result);            // --- показываем результат в новом окне

  // --- формируем строку из массива
  function _printf(arr) {
    var strResult = '', deLimiter = ' => ';
    var typeObj = typeof (arr);
    if (typeObj == 'object') {
      for (var i in arr) {

        var values = arr[i];
        var subValues = '';
        var li = deLimiter;
        if (typeof (values) == 'object') {
          subValues = _printf(values);
        } else {
          li += values;
        }

        strResult += '<li>[' + i + ']' + li + '</li>' + subValues;
      }
    }
    else strResult = '<li>' + arr + '</li>';

    return '<ul>' + strResult + '</ul>';
  }

  // --- показываем результат в новом окне
  function _openWindow(result, href) {
    var modal = window.open('', '', 'scrollbars=1');
    var style = 'button { padding:10px; margin:10px; border:0px grey solid; width:30%; cursor:ponter  }'
      + ' .lg-view-result { border:2px red solid; }';
    var html = '<!DOCTYPE html><head><style>' + style + '</style><head>'
      + '<p><button onclick="window.close();" >Close</button></p><hr>'
      + '<p class="lg-view-result" ><pre>' + result + '</pre></p>';
    modal.document.body.innerHTML = html;
  }
}


class Alert {
  constructor(options) {
    this.class = options.class || 'success';
    this.msg = options.msg;
    this.showTime = options.showTime || this.class === 'danger' ? 6000 : 2500;
  }

  display() {
    let alert = $(
      `<div class="alert alert-${this.class} alert-dismissible alert-fixed">
            <h4 class="alert-heading">${this.msg}</h4>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
    );

    alert.appendTo('body');
    setTimeout(() => alert.remove(), this.showTime);
  }
}

function getExactElemSize(elem, dimension) {
  const box = elem.getBoundingClientRect();
  if (dimension === 'width') {
    return box.right - box.left;
  } else if (dimension === 'height') {
    return box.bottom - box.top;
  } else {
    throw Error('Incorrect dimension provided! Must be either "width" or "height".')
  }
}

// escape all special regex chars except '^' and '$'
function escapeRegExp(string) {
  return string.replace(/[.*+?{}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


// const buttonElement = document.getElementById('btn');

// Добавим обработчик для события "click", предоставив callback.
// Теперь по клику на элемент будет всплывать подсказка.

// buttonElement.addEventListener('click', function (event) {
//     alert('События вызвано функцией!');
// });

// setTimeout( () => {
//     document.addEventListener('click', function (event) {
//         alert('События вызвано функцией!');
//     });
// }, 20);


//var resizerClass = ' .resizer';
//var bottomRightClass  = 'bottom-right';


// Обработка кастомного поля select

setTimeout(() => {

  // var dialogBox = document.querySelector('.v-dialog--active');
  // dialogBox.addEventListener("click", function(e){
  //   var elem = e.target;
  //   inputSelectContainerClose(elem);
  // });

  $(document).ready(function () {
     //$('body').bootstrapMaterialDesign();
     //$('[data-toggle="tooltip"]').tooltip();
  });

  // makeResizableDiv('.resizable', ' .resizer', 'top-left');

  // makeResizableDivNew('.resizable',);

}, 20);



document.addEventListener("click", function (e) {
  var elem = e.target;
  inputSelectContainerClose(elem);
  e.preventDefault();
});


// v-dialog--active

function inputSelectContainerClose(elem) {
  const selectClassName = 'inputSelectOptionContainer';
  const selectOpenButton = 'inputSelectOpenButton';
  const selectTextValue = 'inputSelectTextValue';
  var classList = elem.classList;
  for (var i in classList) {
    var name = classList[i];
    switch (name) {
      case selectClassName:
      case selectOpenButton:
      case selectTextValue:
        return true;
      //break;
    }
  }

  var selectElements = document.querySelectorAll('.' + selectClassName);
  for (var i in selectElements) {
    var selectElem = selectElements[i];
    if (isNumeric(i)) {
      selectElem.style.display = 'none';
    }
  }
}

function isNumeric(n) {
  // Метод isNaN пытается преобразовать переданный параметр в число. 
  // Если параметр не может быть преобразован, возвращает true, иначе возвращает false. 
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function elemSelectedAction(selector, fn) {
  var selectElements = document.querySelectorAll(selector);
  if (!selectElements.length) return;
  for (var i in selectElements) {
    if (isNumeric(i)) {
      var elem = selectElements[i];
      fn(elem);
    }
  }
}


function printArray(arr, maxLevel = 7) {
  var nextLevel = 0;
  function print_r(arr) {
    var strResult = '';
    var deLimiter = ' => ';
    var typeObj = typeof (arr);
    if (typeObj == 'object') {
      for (var i in arr) {

        var values = arr[i];
        var subValues = '';
        var li = deLimiter;
        if (typeof (values) == 'object') {
          if (nextLevel < maxLevel) {
            subValues = print_r(values);
          }
          // else {}
        } else {
          li += values;
        }

        strResult += '<li>[' + i + ']' + li + '</li>' + subValues.toString();
      }
    }
    else strResult = '<li>' + arr + '</li>';
    nextLevel++;
    return '<ul>' + strResult + '</ul>';
  }

  function createContainer(data) {
    var div = document.createElement('div');
    div.className = "alert";
    div.innerHTML = data;
    // document.body.innerHTML = '';
    // document.body.append(div);
    document.body.prepend(div);
  }

  var result = print_r(arr); // --- формируем строку из массива
  createContainer(result);
  return result;
}


function f_createCalendars(n_number) {
  var e_container = document.getElementById('container');
  if (isNaN(n_number) || !e_container) return;
  f_tcalCancel();
  var s_html = '';
  for (var i = 1; i <= n_number; i++)
    s_html += '<div>' + i + '. <input type="text" name="date' + i + '" class="tcal" /></div>';

  e_container.innerHTML = s_html;
  f_tcalInit();
}


function makeResizableDiv(div, resizerClass = ' .resizer', cursorMoveClass = 'bottom-right') {

  //var resizerClass = ' .resizer';
  //var bottomRightClass  = 'bottom-right';

  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + resizerClass);

  const len = resizers.length;
  for (let i = 0; i < len; i++) {
    const currentResizer = resizers[i];
    funcResizer(currentResizer);
  }

  function funcResizer(curItem) {
    var moveStart = false;
    curItem.addEventListener('mousedown', function (e) {
      e.preventDefault();
      moveStart = true;
      window.addEventListener('mousemove', function (e) {
        if (!moveStart) return;
        // debugger;
        if (curItem.classList.contains(cursorMoveClass)) {
          var _bound = element.getBoundingClientRect();
          var _left = element.getBoundingClientRect().left;
          element.style.marginLeft = e.pageX + 'px';
          // element.style.width = e.pageX - _left + 'px';
        }
      });

      window.addEventListener('mouseup', function (e) {
        moveStart = false;
      });
    });
  }
}



function makeResizableDivNew(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .resizer')
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function (e) {
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })

    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      else {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
    }

    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}




function errorHandlerShow() {

  window.onerror = function (msg, url, line, col, error) {
      var m = msg;
      var error = ['window.onerror', { 'msg' : msg }, url, line, col, error];
      //if(errorFlag) printArray(error);
      console.log("################################################");
      console.log("######### -- window.onerror --#########");
      console.log('--- msg   --' + msg);
      console.log('--- url   --' + url);
      console.log('--- line  --' + line);
      console.log('--- col   --' + col);
      console.log('--- error --' + error);
      console.log("################################################");
      console.log("################################################");
  }

  Vue.config.errorHandler = function (err, vm, info) {
      var e = err;
      var error = ['Vue.config.errorHandler', err, vm, info];
      //if(errorFlag) printArray(error);
      console.log("################################################");
      console.log("######### -- Vue.config.errorHandler --#########");
      console.log('=err  ==' + err);
      console.log('=vm   ==' + vm);
      console.log('=info ==' + info);
      console.log("################################################");
      console.log("################################################");
  }

  Vue.config.warnHandler = function (msg, vm, trace) {
      var m = msg;
      var error = ['Vue.config.warnHandler', msg, vm, trace];
      //if(errorFlag) printArray(error);
      console.log("###############################################");
      console.log("######### -- Vue.config.warnHandler --#########");
      console.log('=msg ===' + msg);
      console.log('=vm  ===' + vm);
      console.log('=trace =' + trace);
      console.log("################################################");
      console.log("################################################");

  }

}