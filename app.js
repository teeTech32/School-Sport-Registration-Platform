document.querySelector('#table').style.display = 'none';

class Book{
  constructor(fullname, department, matricnumber, skills, age, level ){
    this.fullname = fullname;
    this.department = department;
    this.matricnumber = matricnumber;
    this.skills = skills;
    this.age = age;
    this.level = level;
  }
}

class UI{
  addDetailsToList(detail){
    const List = document.querySelector('#list-space');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${detail.fullname}</td>
                    <td>${detail.department}</td>
                    <td>${detail.matricnumber}</td>
                    <td>${detail.skills}</td>
                    <td>${detail.age}</td>
                    <td>${detail.level}</td>
                    <td><a href = "#" class = "delete" style = "text-decoration:none;">X</a></td>`;
                    List.appendChild(row); 
  }

  showNotification(message, className){
    const div = document.createElement('div') 
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container');
    const form = document.querySelector('#form-space');
    container.insertBefore(div, form);
    setTimeout(function(){document.querySelector('.alert').remove()}, 5000)
  }

  claerInputs(){
      document.querySelector('#full-name').value = '',
      document.querySelector('#department').value = '',
      document.querySelector('#matric-number').value = '',
      document.querySelector('#skills').value = '',
      document.querySelector('#age').value = '',
      document.querySelector('#level').value = '';
  }

  deleteDetails(target){
    if(target.className==='delete'){
      target.parentElement.parentElement.remove()
    } 
  }
}

class Store{
  static getDetails(){
    let details;
    if(localStorage.getItem('details') === null){
      details = []
    }else{
      details = JSON.parse(localStorage.getItem('details'));
    }
    return details;
  }

  static addDetailsToStore(detail){
    const details = Store.getDetails()
    details.push(detail)
    localStorage.setItem('details', JSON.stringify(details))
  }
  
  static displayDetailsFromStore(){
    const details = Store.getDetails()
    details.forEach(function(detail) {
      const ui = new UI;
      ui.addDetailsToList(detail);
    }); 
  }

  static removeDetailsFromStore(level){
    const details = Store.getDetails()
    details.forEach(function(detail, index){
      if(detail.level===level){
        details.splice(index, 1)
      }
    })
    localStorage.setItem('details', JSON.stringify(details));
  }
}

document.addEventListener('DOMContentLoaded', Store.displayDetailsFromStore);

document.querySelector('#form-space').addEventListener('submit', function(e){
  const fullname = document.querySelector('#full-name').value,
        department = document.querySelector('#department').value,
        matricnumber = document.querySelector('#matric-number').value,
        skills = document.querySelector('#skills').value,
        age = document.querySelector('#age').value,
        level = document.querySelector('#level').value;

  const detail = new Book(fullname, department, matricnumber, skills, age, level);

  const ui = new UI;
  if(fullname==='' || department==='' || matricnumber==='' || skills==='' || age==='' || level===''){
    ui.showNotification('Please complete the input part !', 'error');
    document.querySelector('#btn-submit').style.backgroundColor = 'red';
    setTimeout(function(){document.querySelector('#btn-submit').style.backgroundColor = '';}, 2000)
  }else if(age <= 15 || age >= 26){
    ui.showNotification('You are not illegible to register !', 'error');
    document.querySelector('#btn-submit').style.backgroundColor = 'red';
    setTimeout(function(){document.querySelector('#btn-submit').style.backgroundColor = '';}, 2000)
    ui.claerInputs();
  }else{
    ui.claerInputs();
    document.querySelector('img').style.display = 'block';
    document.querySelector('#btn-submit').style.backgroundColor = 'green';
    setTimeout(function(){document.querySelector('#btn-submit').style.backgroundColor = '';}, 2000)
    setTimeout(function(){document.querySelector('img').style.display = 'none'
    ui.addDetailsToList(detail);
    Store.addDetailsToStore(detail);
    ui.showNotification('Congratulations !', 'success');}, 5000)
  }
  e.preventDefault()
})

document.querySelector('#list-space').addEventListener('click', function(e){
   const ui = new UI;
   ui.deleteDetails(e.target)
   Store.removeDetailsFromStore(e.target.parentElement.previousElementSibling.textContent)
   ui.showNotification('Student removed !', 'error');
  e.preventDefault()
})

const veiwBtn = document.querySelector('#btn-veiw');
veiwBtn.addEventListener('click', function(e){
  veiwBtn.style.backgroundColor = 'green';
  document.querySelector('img').style.display = 'block';
  setTimeout(function(){ document.querySelector('img').style.display = 'none';
  document.querySelector('#table').style.width = 'max-content';
  document.querySelector('#table').style.display = 'block';
  veiwBtn.style.backgroundColor = '';}, 5000)
  e.preventDefault() 
})