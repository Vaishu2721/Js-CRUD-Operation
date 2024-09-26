//function to validate form inputs before submittinf the form
function formValidation(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;

    if(name=="")
    {
        alert("Name is mandatory")
        return false;
    }

    if(email=="")
    {
        alert("Email is mandatory")
        return false;
    }else if (!email.includes('@')){
        alert("Invalid Email")
        return false;
    }

    if(age==""){
        alert("Age is mandatory")
        return false;
    }else if(age<1){
        alert("Age must be greater than zero")
        return false;
    }

    if(address==""){
        alert("Address cannot be left empty!")
        return false;
    }
    return true;
}

//function to show the data
function showData(){
    var personDetails;
    if(localStorage.getItem("personDetails")==null){
        personDetails=[];
    }else{
        personDetails=JSON.parse(localStorage.getItem("personDetails"));
    }

    var data=""

    personDetails.forEach(function (element,index){
        data+= "<tr> <td>" + element.name + "</td> <td>" +element.email +"</td><td>" +element.age + "</td><td>"
                + element.address + "</td>"
        data+= '<td><button class= "delete-btn" id="delete" onclick="deleteData('
                +index+')"> Delete</button><button class= "delete-btn" id="edit" onclick="updateData('+index+')"> Edit</button>'
                + "</td></tr>";
    });


    document.querySelector("#table tbody").innerHTML=data;
}

//loads all the data when the document or page is loaded
document.onload=showData();

//function to add data from local storage to local storage
function addData(){
    //if all the form validations are satisfied
    if(formValidation()==true){
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;

        var personDetails;
        if(localStorage.getItem("personDetails")==null){
            personDetails=[];
        }else{
            personDetails=JSON.parse(localStorage.getItem("personDetails"));
        }

        personDetails.push({
            name: name, 
            email : email,
            age : age,
            address: address,
        })

        localStorage.setItem("personDetails", JSON.stringify(personDetails));
        showData();
        document.getElementById("name").value="";
        document.getElementById("email").value="";
        document.getElementById("age").value="";
        document.getElementById("address").value="";
    }
}

//function to delete data from the local storage
function deleteData(index)
{
    var personDetails;
    if(localStorage.getItem("personDetails")==null){
        personDetails=[];
    }else{
        personDetails=JSON.parse(localStorage.getItem("personDetails"));
    }

    personDetails.splice(index,1);
    localStorage.setItem("personDetails", JSON.stringify(personDetails));
    showData()
}

//function to update/edit data in the local storage
function updateData(index)
{
    document.getElementById("submit").style.display="none";
    document.getElementById("update").style.display="block";

    var personDetails;
    if(localStorage.getItem("personDetails")==null){
        personDetails=[];
    }else{
        personDetails=JSON.parse(localStorage.getItem("personDetails"));
    }

    document.getElementById("name").value =personDetails[index].name;
    document.getElementById("email").value =personDetails[index].email;
    document.getElementById("age").value =personDetails[index].age;
    document.getElementById("address").value =personDetails[index].address;

    document.getElementById("update").onclick=function(){
        if(formValidation()==true){
            personDetails[index].name=document.getElementById("name").value;
            personDetails[index].email=document.getElementById("email").value;
            personDetails[index].age=document.getElementById("age").value;
            personDetails[index].address=document.getElementById("address").value;

            localStorage.setItem("personDetails", JSON.stringify(personDetails));
            showData();
            document.getElementById("name").value="";
            document.getElementById("email").value="";
            document.getElementById("age").value="";
            document.getElementById("address").value="";

            document.getElementById("submit").style.display="block";
            document.getElementById("update").style.display="none";
        }        
    }
}