class Engine {
   get movieChecklist() {
      return document.getElementById('movie-checklist')
   }

   get container() {
      return document.getElementById('container');
   }

   get watchedList() {
      return JSON.parse(localStorage.getItem('movies-watched') || '{}')
   }

   set watchedList(list) {
      localStorage.setItem('movies-watched', JSON.stringify(list));
   }

   constructor() {
      this.setupDropdown();
      this.setupEvents();
   }

   setupEvents() {
      this.movieChecklist.addEventListener('change', this.switchList.bind(this));
   }

   setupDropdown() {
      let dropdown = this.movieChecklist;
      for (const checklist of Object.keys(document.data)) {
         let option = document.createElement('option');
         option.value = checklist;
         option.innerText = checklist;
         dropdown.appendChild(option);
      }
   }

   switchList({ target: { value }}) {
      this.clearContainer();

      const checklistName = this.movieChecklist.value;
      const watchedList = this.watchedList;

      let movies = document.data[checklistName];

      if (movies === undefined) {
         movies = [];
      }

      const watchedCount = movies.filter(x => watchedList[x] === true).length;

      let prelude = document.createElement('p');
      prelude.innerText = `You've seen ${watchedCount} out of ${movies.length} films on this list. Refresh to update the count.`;

      let container = this.container;

      container.appendChild(prelude);

      let i = 0;
      for (const movie of movies) {
         const checkboxId = `movie-${i++}`;

         let checkbox = document.createElement('input');
         checkbox.type = 'checkbox';
         checkbox.id = checkboxId;

         let watched = watchedList[movie];

         if (watched !== undefined) {
            checkbox.checked = watched;
         }

         checkbox.addEventListener('change', (event) => {
            this.checkWatched(movie, event)
         });

         let label = document.createElement('label');
         label.innerText = movie;
         label.htmlFor = checkboxId;

         container.appendChild(checkbox);
         container.appendChild(label);
         container.appendChild(document.createElement('br'));
      }
   }

   clearContainer() {
      while(this.container.firstChild) {
         // This is important to remove event handlers.
         this.container.firstChild.remove();
      }
   }

   checkWatched(movie, { target: { checked } }) {
      console.log(movie, checked);
      let list = this.watchedList;
      list[movie] = checked;
      this.watchedList = list;
   }
}
