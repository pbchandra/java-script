//Module pattren,closers,Saparation of consert immediatly invoked function expresssions,DRY 


var budgetController =(function(){

	var Expense=function(id,description,value){
		this.id=id;
		this.description=description;
		this.value=value;
		
	}
	var Income=function(id,description,value){
		this.id=id;
		this.description=description;
		this.value=value;
		
	}
	
	var data ={
		allitems :{
			inc: [],
			exp: []
		},
		totals :{
			exp : 0,
			inc : 0
		}
	}
	
	return{
		
		AddNewItem : function(type,des,val){
			var newItem ,ID;
			;
		
				
			
			//create new id 
			if(data.allitems[type].length > 0){
				ID=data.allitems[type][data.allitems[type].length - 1].id + 1;
			}
			else{
				   ID=0;
			}
		 
			if(type === 'exp'){
				
				newItem = new Expense(ID,des,val);
				
			}
			else if(type === 'inc'){
					newItem = new Income(ID,des,val);
			}
			data.allitems[type].push(newItem);
			return newItem;
		},
		testing : function(){
			console.log(data);
		}
	}
	
})();



var UIController =(function(){
	
	var DOMStrings ={
		inputtype :'.add__type',
		inputdescription : '.add__description',
		inputvalue :'.add__value',
		inputButton : '.add__btn',
		expensecontainer:'.expenses__list',
		incomecontainer: '.income__list'
		
	};
	return{
		getinput : function(){
     return{
		
		 type : document.querySelector(DOMStrings.inputtype).value,
		 description : document.querySelector(DOMStrings.inputdescription).value,
		 value : document.querySelector(DOMStrings.inputvalue).value
		
	      }
	                          },
		AddListItem : function(obj,type){
			// create an html string with place holder text
			var html,newhtml,element;
			if(type==='inc'){
				element=DOMStrings.incomecontainer;
					html='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>  </div>  </div>  </div>';
			}
		
			else if(type==='exp'){
				element=DOMStrings.expensecontainer;
					html= '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">- %value%</div> <div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
					}

			
			// replace placeholder text with actual text
			
			newhtml=html.replace('%id%',obj.id);
			newhtml=newhtml.replace('%description%',obj.description);
			newhtml=newhtml.replace('%value%',obj.value);

			//insert html into DOM
			document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);
		},
		
		clearfields: function(){
			var fields;
			fields=document.querySelectorAll(DOMStrings.inputdescription + ',' +DOMStrings.inputvalue);
			var fieldsarr=Array.prototype.slice.call(fields);
		
			fieldsarr.forEach(function(current,index,Array){
				current.value='';
			});
			
		//	fieldsarr[0].focus();
		},
		getDomstrings : function(){
			return DOMStrings;
		}
	
	}
})();


var Controller =(function(BudgetCtrl,UICtrl){
	
	var setUpEventListeners=function(){
		
		var DOM = UICtrl.getDomstrings();
   
	document.querySelector(DOM.inputButton).addEventListener('click',CtrlAddItem);
		
    document.addEventListener('keypress',function(event){
	
		if(event.keyCode =='13'||event.which =='13'){
			CtrlAddItem();
		}
	});
		
	};
	
	
	var CtrlAddItem =function(){
		
		var input,newitem;
		
		// get the field input data		
		input = UICtrl.getinput();
		
/*		This uses Regular expressions which are very powerful in selecting characters in strings. So first thing addItemCtrl() does is remove all the spaces (if any) at the beginning of the description string.*/
		
		input.description = input.description.replace(/^\s*/, '');
	    
	     //add item to budget controller
		newitem= BudgetCtrl.AddNewItem(input.type,input.description,input.value);
		
		//add item to UI
		UICtrl.AddListItem(newitem,input.type);
		
		//clear fields
		
		UICtrl.clearfields();
		
	}
	
	return{
		init : function(){
			
     console.log('Application has started.');
			return setUpEventListeners();
		}
	}

	
	
})(budgetController,UIController);

Controller.init();
