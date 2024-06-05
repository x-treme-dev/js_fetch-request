 

/**
 * 1. Запретить перезагрузку страницы при отправке формы
 * 2. Собрать данные из формы
 * 3. 
 * @param {} event 
 */

function handleFormSubmit(event) {
    // Отправка/получение данных из формы без перезагрузки страницы
    event.preventDefault();
    // получить данные из формы
    let formData = new FormData(formMovies);
    // получить значение input 
    let title = formData.get('title');
    // получить значение select
    let type = formData.get('type');

    getDataForm(title, type);
}

function getDataForm(title, type){
        // получить значения из формы и вставить в запрос
        let args = '&s='+ title +'&type=' + type;
        let url = "http://www.omdbapi.com/?apikey=d93fcb59&plot=full"+args;
       
        // запрос с промисами
        fetch(url)
       .then(
        response => response.json()
       )
       .then(
        // data - это объект
        data =>{
            if(data.Error){
                document.getElementById('message').innerHTML = 'Movie not found!'
            } else{
                console.log(data);
            /**
             * Пришел объект вида
             * Object { Search: (10) […], totalResults: "50", Response: "True" } Response: "True" 
             * Search: Array(10) [ {…}, {…}, {…}, … ]
             * 0: Object { Title: "The Tit and the Moon", Year: "1994", imdbID: "tt0111403", … }
             * 1: Object { Title: "Tit for Tat", Year: "1935", imdbID: "tt0027113", … }
             * и т.д.
             * 
             * 1. У объекта есть ключ - Search
             * 2. В Search есть еще Объект 
             * 3. А у Объекта есть именнованные свойства, непример Title
             * Поэтому надо:
             * 1. Добраться до ключа 
             * 2. Добраться до Объекта
             * 3. Добраться до свойства Объекта
             */
                for(key in data){
                     
                    data[key].forEach((innerKey) => 
                        document.querySelector('.films__wrapper').innerHTML += 
                        ` <div class="films__item"> 
                            <div class="films__image-wrap">
                                <img class="films__img" src="`+ innerKey.Poster +`" alt="Image not found!" width="150" height="200">
                                </div>
                                    <div class="films__content">
                                        <p class="films__p">`+ innerKey.Type +`</p>
                                            <h2 class="films__h2">` + innerKey.Title + `</h2>
                                            <p class="films__p">` + innerKey.Year + `</p>
                                                 <button class="films__button">Details</button>
                                    </div>
                        </div> `
                    );
                }       
            } 
        }).catch(error => {
            console.log(error);
        })
}


const formMovies = document.getElementById('formMovies');
formMovies.addEventListener('submit', handleFormSubmit);
  
 


