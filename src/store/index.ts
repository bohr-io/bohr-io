import { getMe } from '@/services/api';
import { createStore } from 'vuex'
import i18n from '../i18n'
import site from './site';

const DEFAULT_THEME = 'dark';

export default createStore({
    modules: {
        site,
    },
    state() {
        return {
            me: null,
            theme: {
                default: DEFAULT_THEME,
                selected: window.localStorage.getItem('theme') || DEFAULT_THEME,
            },
            preview: false,
            toastData: null,
            appLocale: i18n.global.locale,
            isLoading: true,
            globalPresenceOther: undefined,
            isSaving: false,
            isProdEnv: location.host === 'bohr.io',
        }
    },
    mutations: {
        setMe (state, payload) {
            state.me = payload
        },
        setTheme (state, payload) {
            state.theme = payload
        },
        setPreview (state, payload) {
            state.preview = payload
        },
        setToastData(state, payload) {
            state.toastData = payload;
        },
        setAppLocale(state, payload) {
            state.appLocale = payload;
        },
        setIsLoading(state, payload){
            state.isLoading = payload;
        },
        setIsSaving(state, payload) {
            state.isSaving = payload;
        },
        lockScroll() {
            document.querySelector(':root')?.classList.add('scroll__lock');
        },
        unlockScroll() {
            document.querySelector(':root')?.classList.remove('scroll__lock');
        },
        lockScrollScroll() {
            document.querySelector(':root')?.classList.remove('scroll__lock');
            document.querySelector(':root')?.classList.add('scroll__lockScroll');
        },
        unlockScrollScroll() {
            document.querySelector(':root')?.classList.remove('scroll__lockScroll');
        },
    },
    actions: {
        async getMe({ commit }) {
            const { data: me } = await getMe();
            commit('setMe', me);
        },
        openPreview({ commit }) {
            commit('setPreview', true);
        },
        closePreview({ commit }) {
            commit('setPreview', false);
        },
        changeLocale({ commit }, payload) {
            commit('setAppLocale', payload);
            i18n.global.locale = payload;
            localStorage.setItem('appLocale', payload);
            document.querySelector('html')?.setAttribute('lang', payload);
        },
        changeTheme({ state, commit }, payload) {
            const themeObj = {
                ...state.theme,
                selected: payload,
            };

            commit('setTheme', themeObj);
            localStorage.setItem('theme', payload);
        },
    },
    getters:{
        isLoading(state){
            return state.isLoading;
        },
    }
})