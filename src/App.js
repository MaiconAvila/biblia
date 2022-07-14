import { useState } from 'react';
import { books } from './books';
import openBook from './assets/open-book.gif';
import styled from 'styled-components';
// import { biblia } from './biblia-acf';

const Container = styled.div`
  height: 100vh;
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
  margin-bottom: ${props => props.marginBottom};
  text-align: ${props => props.textAlign};
`;

const Img = styled.img`
  width: 30rem;
`;

const Button = styled.button`
  background: ${props => props.color};
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

const Card = styled.div`
  border-radius: .6875rem;
  box-shadow: 0 .3125rem #e5e5e5;
  border: .0625rem solid #e5e5e5;
  width: 30rem;
  height: 15rem;
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

function App() {
  // const livrosMoises = biblia.slice(0, 5)
  // const terraPrometida = biblia.slice(5, 8)
  // const monarquia = biblia.slice(8, 14)
  // const reconstrucaoJerusalem = biblia.slice(14, 17)
  // const sabedoriaIsral = biblia.slice(17, 22)
  // const profetasMaiores = biblia.slice(22, 26)
  // const profetasMenores = biblia.slice(26, 39)
  // const evangelhos = biblia.slice(39, 43)
  // const formacaoIgreja = biblia.slice(43, 44)
  // const cartasPaulo = biblia.slice(44, 57)
  // const epistolasGerais = biblia.slice(57, 65)
  // const profecia = biblia.slice(65, 66)

  const [bookNumber, setBookNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBook = () => {
    let random = Math.floor(Math.random() * 65);
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setBookNumber(random)
    }, 300)
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

  return (
    <Container>
      <Text
        fontWeight='bold'
        marginBottom='4rem'
        textAlign='center'
      >
        Aplicação desenvolvida para agrupar os livros bíblicos para melhor memorização e sortear um livro novo a cada clique no botão.
      </Text>
      <Section>
        <Button onClick={handleBook} color="#15d798">Sortear</Button>
        <Button onClick={handleCopy} color="#fd5101" disabled={!bookNumber}>Copiar</Button>
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
    </Container>
  );
}

export default App;
