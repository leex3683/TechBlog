const deleteFormHandler = async (event) => {

const id = document.querySelector("#blogpost").dataset.indexNumber
    if (id) {
      const response = await fetch(`/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }

  };

  
  document
    .querySelector('.delete')
    .addEventListener('click', deleteFormHandler);
  