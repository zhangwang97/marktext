import { ipcRenderer } from 'electron'
import bus from '../bus'

// messages from main process, and do not change the state
const state = {}

const getters = {}

const mutations = {}

const actions = {
  LISTEN_FOR_EDIT () {
    ipcRenderer.on('mt::editor-edit-action', (e, { type }) => {
      // TODO: Why emit the same value twice?
      bus.$emit(type, type)
    })
  },

  LISTEN_FOR_VIEW ({ commit }) {
    ipcRenderer.on('mt::editor-change-view', (e, data) => {
      commit('SET_MODE', data)
    })
    ipcRenderer.on('mt::show-command-palette', () => {
      bus.$emit('show-command-palette')
    })
  },

  LISTEN_FOR_ABOUT_DIALOG ({ commit }) {
    ipcRenderer.on('AGANI::about-dialog', e => {
      bus.$emit('aboutDialog')
    })
  },

  LISTEN_FOR_PARAGRAPH_INLINE_STYLE () {
    ipcRenderer.on('mt::editor-paragraph-action', (e, { type }) => {
      bus.$emit('paragraph', type)
    })
    ipcRenderer.on('mt::editor-format-action', (e, { type }) => {
      bus.$emit('format', type)
    })
  }
}

const listenForMain = { state, getters, mutations, actions }

export default listenForMain
