class TrieNode {
  constructor() {
    this.children = {}
    this.isEnd = false
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  insert(word) {
    let node = this.root
    for (let char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode()
      }
      node = node.children[char]
    }
    node.isEnd = true
  }

  searchPrefix(prefix) {
    let node = this.root
    for (let char of prefix.toLowerCase()) {
      if (!node.children[char]) return []
      node = node.children[char]
    }

    let results = []
    this._dfs(node, prefix.toLowerCase(), results)
    return results
  }

  _dfs(node, prefix, results) {
    if (node.isEnd) results.push(prefix)

    for (let char in node.children) {
      this._dfs(node.children[char], prefix + char, results)
    }
  }
}