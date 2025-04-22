import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';

const initialBoard = ['', '', '', '', '', '', '', '', ''];

export default function TicTacToeScreen() {
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [vsBot, setVsBot] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handlePress = (index) => {
    if (board[index] !== '' || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isPlayerOneTurn ? 'X' : 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      Alert.alert('Fim de Jogo', winner === 'draw' ? 'Empate!' : `Vencedor: ${winner}`);
      setGameOver(true);
      return;
    }

    setIsPlayerOneTurn(!isPlayerOneTurn);

    if (vsBot && isPlayerOneTurn) {
      setTimeout(() => botMove(newBoard), 500);
    }
  };

  const botMove = (boardState) => {
    const emptyIndexes = boardState
      .map((value, index) => (value === '' ? index : null))
      .filter((v) => v !== null);

    if (emptyIndexes.length === 0) return;

    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    const newBoard = [...boardState];
    newBoard[randomIndex] = 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      Alert.alert('Fim de Jogo', winner === 'draw' ? 'Empate!' : `Vencedor: ${winner}`);
      setGameOver(true);
      return;
    }

    setIsPlayerOneTurn(true);
  };

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
      [0, 4, 8], [2, 4, 6]             // diagonais
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
        <Button title="Jogar vs Jogador" onPress={() => { resetGame(); setVsBot(false); }} />
        <Button title="Jogar vs Máquina" onPress={() => { resetGame(); setVsBot(true); }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  board: { width: 300, height: 300, flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    width: 100, height: 100,
    borderWidth: 1, borderColor: '#000',
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#fff'
  },
  cellText: { fontSize: 48, fontWeight: 'bold' },
  controls: { marginTop: 20, flexDirection: 'row', gap: 10 }
});
