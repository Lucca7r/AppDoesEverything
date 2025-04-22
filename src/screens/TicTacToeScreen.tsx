import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  GestureResponderEvent,
} from 'react-native';
import styles from '../style/TicTacToeScreen';

type Player = 'X' | 'O' | '';
type Winner = Player | 'draw' | null;

const initialBoard: Player[] = Array(9).fill('');

export default function TicTacToeScreen(): JSX.Element {
  const [board, setBoard] = useState<Player[]>(initialBoard);
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [vsBot, setVsBot] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Winner>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (index: number) => {
    if (board[index] !== '' || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isPlayerOneTurn ? 'X' : 'O';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setGameOver(true);
      setModalVisible(true);
      return;
    }

    setIsPlayerOneTurn(!isPlayerOneTurn);

    if (vsBot && isPlayerOneTurn) {
      setTimeout(() => botMove(newBoard), 500);
    }
  };

  const botMove = (boardState: Player[]) => {
    const emptyIndexes = boardState
      .map((value, index) => (value === '' ? index : null))
      .filter((v): v is number => v !== null);

    if (emptyIndexes.length === 0) return;

    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    const newBoard = [...boardState];
    newBoard[randomIndex] = 'O';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setGameOver(true);
      setModalVisible(true);
      return;
    }

    setIsPlayerOneTurn(true);
  };

  const checkWinner = (b: Player[]): Winner => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, bIdx, c] of lines) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) return b[a];
    }
    return b.includes('') ? null : 'draw';
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerOneTurn(true);
    setGameOver(false);
    setWinner(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handlePress(index)}>
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button}>
          <Button title="Jogar vs Jogador" color="white" onPress={() => { resetGame(); setVsBot(false); }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button title="Jogar vs Máquina" color="white" onPress={() => { resetGame(); setVsBot(true); }} />
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              {winner === 'draw' ? 'Empate!' : `Vencedor: ${winner}`}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={resetGame}>
              <Text style={styles.modalButtonText}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
