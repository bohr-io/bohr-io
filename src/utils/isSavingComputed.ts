export default function() {
  return {
    isSaving: {
      get() {
        return (this as any).$store.state.isSaving as Boolean;
      },
  
      set(value: boolean) {
        (this as any).$store.commit('setIsSaving', value);
      },
    }
  }
}
