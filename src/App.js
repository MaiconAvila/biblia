import { useEffect, useState } from 'react';
import { books } from './books';
import openBook from './assets/open-book.gif';
import styled from 'styled-components';

const Container = styled.div`
  padding: 5rem 0;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Section = styled.div`
  width: 29.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.p`
  max-width: 55rem;
  font-size: 1.5rem;
  font-weight: ${props => props.fontWeight};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  text-align: ${props => props.textAlign};

  @media (max-width: 625px) {
    &{
      width: ${props => props.widthText};
      margin-right: auto;
      margin-left: auto;
    }
  }
`;

const Img = styled.img`
  width: 30rem;
`;

const Button = styled.button`
  background: ${props => props.color};
  margin-top: ${props => props.marginTop};
  border-radius: .6875rem;
  box-shadow: 0 5px #e5e5e5;
  padding: 1.25rem 2.8125rem;
  color: #ffffff;
  display: inline-block;
  font: normal bold 1.625rem/1 "Open Sans", sans-serif;
  text-align: center;
  text-shadow: .0625rem .0625rem #000000;
  border: none;
  cursor: pointer;
  
  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

const ButtonCategory = styled.button`
  background: ${props => props.color};
  margin-top: ${props => props.marginTop};
  border-radius: .6875rem;
  box-shadow: 0 5px #e5e5e5;
  padding: 1.25rem 2.8125rem;
  color: #ffffff;
  display: inline-block;
  font: normal bold 1.2rem/1 "Open Sans", sans-serif;
  text-align: center;
  text-shadow: .0625rem .0625rem #000000;
  border: none;
  cursor: pointer;
  
  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

const Card = styled.div`
  border-radius: .6875rem;
  box-shadow: 0 .3125rem #e5e5e5;
  border: .0625rem solid #e5e5e5;
  width: 30rem;
  min-height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: vibrate 2s ease 0s infinite normal forwards;
  margin-top: 2rem;

  &: {
    @keyframes vibrate {
      0% {
        transform: translate(0);
      }
      20% {
        transform: translate(-2px, 2px);
      }
      40% {
        transform: translate(-2px, -2px);
      }
      60% {
        transform: translate(2px, 2px);
      }
      80% {
        transform: translate(2px, -2px);
      }
      100% {
        transform: translate(0);
      }
    }
  }
`;

const Paragraph = styled.p`
  width: 100%;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: .5px solid #e5e5e5;
  font-size: 1.5rem;
  cursor: pointer;

  &:last-of-type {
    border: none;
  }

  &:hover {
    background-color: #e8e8e8;
  }
`;

function App() {
  const livrosMoises = books.slice(0, 5)
  const terraPrometida = books.slice(5, 8)
  const monarquia = books.slice(8, 14)
  const reconstrucaoJerusalem = books.slice(14, 17)
  const sabedoriaIsral = books.slice(17, 22)
  const profetasMaiores = books.slice(22, 26)
  const profetasMenores = books.slice(26, 39)
  const evangelhos = books.slice(39, 43)
  const formacaoIgreja = books.slice(43, 44)
  const cartasPaulo = books.slice(44, 57)
  const epistolasGerais = books.slice(57, 65)
  const profecia = books.slice(65, 66)

  const [bookNumber, setBookNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [random, setRandom] = useState(null);
  const [categoryState, setCategoryState] = useState(false);
  const [numberCategory, setNumberCategory] = useState(null)
  
  const valueRandom = Array.from(Array(66).keys());

  useEffect(() => {
    setRandom(Math.floor(Math.random() * valueRandom.length));

    for(let i = 0; i < valueRandom.length; i++) {
      if(valueRandom[i] === random) {
        valueRandom.splice(i, 1);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleBook = () => {
    if(history.indexOf(random) === -1 && random !== null) {
      setRandom(Math.floor(Math.random() * valueRandom.length));
      
      setHistory( history => [...history, random])
      setLoading(true)
      
      setTimeout(() => {
        setLoading(false)
        setBookNumber(random)
      }, 300)

      for(let i = 0; i < valueRandom.length; i++) {
        if(valueRandom[i] === random) {
          valueRandom.splice(i, 1);
        }
      }
      
      if(history.length === 66) {
        setHistory([])
      }
      
    } else {
      setRandom(Math.floor(Math.random() * valueRandom.length));

      for(let i = 0; i < valueRandom.length; i++) {
        if(valueRandom[i] === random) {
          valueRandom.splice(i, 1);
        }
      }

      if(history.length === 66) {
        setHistory([])
      }
      
    }
  }
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(books[bookNumber].book)
  }

  const groups = {
    name: (bookNumber >= 0 && bookNumber <= 4 && "Livros de Moises")
      || (bookNumber >= 5 && bookNumber <= 7 && "Terra prometida")
      || (bookNumber >= 8 && bookNumber <= 13 && "Monarquia")
      || (bookNumber >= 14 && bookNumber <= 16 && "Reconstrução de Jerusalém")
      || (bookNumber >= 17 && bookNumber <= 21 && "Sabedoria de Israel")
      || (bookNumber >= 22 && bookNumber <= 25 && "Profetas Maiores")
      || (bookNumber >= 26 && bookNumber <= 38 && "Profetas Menores")
      || (bookNumber >= 39 && bookNumber <= 42 && "Evangelhos")
      || (bookNumber === 43 && "Formação da igreja")
      || (bookNumber >= 44 && bookNumber <= 56 && "Cartas de Paulo")
      || (bookNumber >= 57 && bookNumber <= 64 && "Epístolas Gerais")
      || (bookNumber === 65 && "Profecia")
  }

  const category = {
    dataCategory: (numberCategory === 0 && { name: "Livros de Moises", data: livrosMoises })
      || (numberCategory === 1 && { name: "Terra prometida", data: terraPrometida})
      || (numberCategory === 2 && {name: "Monarquia", data: monarquia})
      || (numberCategory === 3 && { name: "Reconstrução de Jerusalém", data: reconstrucaoJerusalem })
      || (numberCategory === 4 && { name: "Sabedoria de Israel", data: sabedoriaIsral })
      || (numberCategory === 5 && { name: "Profetas Maiores", data: profetasMaiores })
      || (numberCategory === 6 && { name: "Profetas Menores", data: profetasMenores })
      || (numberCategory === 7 && { name: "Evangelhos", data: evangelhos })
      || (numberCategory === 8 && { name: 'Formação da igreja', data: formacaoIgreja })
      || (numberCategory === 9 && { name: "Cartas de Paulo", data: cartasPaulo })
      || (numberCategory === 10 && { name: "Epístolas Gerais", data: epistolasGerais })
      || (numberCategory === 11 && { name: "Profecia", data: profecia })
  }

  const categoryName = [
    { id: 0, name: "Livros de Moises", color: '#ff5be5' },
    { id: 1, name: "Monarquia", color: '#ff8b45' },
    { id: 2, name: "Terra prometida", color: '#ffa87d'},
    { id: 3, name: "Reconstrução de Jerusalém", color: '#5402be'},
    { id: 4, name: "Sabedoria de Israel", color: '#029666'},
    { id: 5, name: "Profetas Maiores", color: '#01e1d9'},
    { id: 6, name: "Profetas Menores", color: '#aaaf68'},
    { id: 7, name: "Evangelhos", color: '#faaeff'},
    { id: 8, name: 'Formação da igreja', color: '#aafb00'},
    { id: 9, name: "Cartas de Paulo", color: '#ff0398'},
    { id: 10, name: "Epístolas Gerais", color: '#cf8bfa'},
    { id: 11, name: "Profecia", color: '#7fea60' }
  ]

  const handleCategory = () => {
    if (categoryState){
      setCategoryState(false)
      setNumberCategory(null)
    } else {
      setCategoryState(true)
    }
  }

  return (
    <Container>
      <Text
        fontWeight='bold'
        marginBottom='4rem'
        textAlign='center'
        widthText='90%'
      >
        Aplicação desenvolvida para agrupar livros bíblicos por categoria, para melhor memorização.
      </Text>
      <Text
        marginBottom='4rem'
        textAlign='center'
        widthText='90%'
      >
        Ao sortear, verá um card com um uma categoria e um livro e você pode abrir a bíblia e procurar por ele para memorizar melhor sua localização pelas categorias.
      </Text>
      <Section>
        <Button onClick={handleBook} color="#15d798">Sortear</Button>
        <Button onClick={handleCopy} color="#fd5101" disabled={!bookNumber}>Copiar Livro</Button>
      </Section>
      {loading
        ? <Img src={openBook} />
        : <>
          {(bookNumber || bookNumber === 0) &&
            <Card>
              <Text
                fontWeight='bold'
                marginBottom='1rem'
              >
                {groups.name}
              </Text>
              <Text>
                {books[bookNumber].book}
              </Text>
            </Card>
          }
        </>
      }

      <Button onClick={handleCategory} marginTop='2rem' color="#3595d6">Ver Categorias</Button>
      {categoryState && numberCategory !== null &&
        <Card>
          <Text
            fontWeight='bold'
            marginTop='1rem'
            marginBottom='1rem'
          >{category.dataCategory.name}</Text>
          {category.dataCategory.data.map(item => {
            return (
              <>
                <Paragraph onClick={() => navigator.clipboard.writeText(item.book)}>{item.book}</Paragraph>
              </>
            )
          })}
        </Card>
      }
      {categoryState &&
        <>
        {categoryName.map(item => {
            return (
              <ButtonCategory onClick={() => setNumberCategory(item.id)} marginTop='2rem' color={item.color}>{item.name}</ButtonCategory>
            )
          })}
        </>
      }
    </Container>
  );
}

export default App;
