function saveToLocalStorage(event) {
    event.preventDefault();

    const expenseAmount = event.target.expenseAmount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    //addind-feature_01:

    const obj={
        expenseAmount,description,category
    }

    const obj_string = JSON.stringify(obj);
    localStorage.setItem(obj.expenseAmount, obj_string);


    showExpenseDetailsOnScreen(obj);


}

 //on refreshing:
 window.addEventListener('DOMContentLoaded',()=>{
    const local_storage=localStorage;
    const local_storage_keys=Object.keys(local_storage);
    for(var i=0;i<local_storage_keys.length;i++){
        const each_key=local_storage_keys[i];
        const local_storage_sting_obj=local_storage[each_key]
        const local_storage_obj=JSON.parse(local_storage_sting_obj)

        showExpenseDetailsOnScreen(local_storage_obj);//works
    }
})

function showExpenseDetailsOnScreen(expense){
    //works
    document.getElementById("expense").value="";
    document.getElementById("description").value="";
    document.getElementById("option").value="";

    if (localStorage.getItem(expense.expenseAmount)){ //works:dont allow duplicate key(email);
        removeExpTrackerFromScreen(expense.expenseAmount);
    }

const parent_node=document.getElementById("ListOfExpenses");
const child_node=`<li id=${expense.expenseAmount}>${expense.expenseAmount}--${expense.description}--${expense.category}<button onclick=delete_expTracker_localstorage('${expense.expenseAmount}')>Delete Expense Tracker</button><button onclick=editExpTracker('${expense.expenseAmount}','${expense.description}','${expense.category}')>Edit Expense Tracker</button></li>`
parent_node.innerHTML=parent_node.innerHTML+child_node;

}

function delete_expTracker_localstorage(amount){
    localStorage.removeItem(amount);//works
    removeExpTrackerFromScreen(amount);
}

function removeExpTrackerFromScreen(amount){
    const parent=document.getElementById("ListOfExpenses");
    const child=document.getElementById(amount);
    if(child){
        parent.removeChild(child);

    }

}

function editExpTracker(amount,description,category){
    document.getElementById("expense").value=amount;
    document.getElementById("description").value=description;
    document.getElementById("option").value=category;
    delete_expTracker_localstorage(amount);

}
