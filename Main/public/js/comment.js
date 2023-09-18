const commentFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the comment
    const post = document.querySelector('#comment').value.trim();
    const blogpost_id = document.querySelector("#blogcomment").dataset.indexNumber
   
    if (post) {
      // Send a POST request to the Homeroute
      const response = await fetch(`/comment`, {
        method: 'POST',
        body: JSON.stringify({ post, blogpost_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, reload page
        document.location.replace(`/comment/${blogpost_id}`);
      } else {
        alert(response.statusText);
      }
    }

  };

  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
  
