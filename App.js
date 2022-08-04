const { useState, useEffect } = require("react")

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  // 비동기처리 : 클라에서 서버에게 요청한 데이터가 돌아오기전에 클라의 코드를 실행시킴
  // setTimeout(@@,3000)을 하게되면 뒤에 뭔 코드가 있던 얘가 제일 먼저 나오듯이.
  // 이를 방지하기위해서는 callbacFun을 쓰는게 대부분인데 이를 남용하면 콜백지옥에 걸린다
  // 그래서 이 콜백지옥을 방지하기위해 async 함수를 처음부터 넣어주는거임
  const getMovies = async () => {
    //async을 사용하게되면 await함수를 사용할 수 있다. 
    //await에 해당하는 값(함수)을 기다렸다가 async을 실행하는 고임~~
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return <div>
    {loading ? (
      <h1>Lading...</h1>
    ) : (
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img src={movie.medium_cover_image}/>
            <h2>{movie.title}</h2>
            <p>{movie.summary}</p>
            <ul>
              {movie.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>)}
  </div>


}

export default App;