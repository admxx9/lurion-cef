(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const state = JSON.parse(localStorage.getItem('emprego-ui') || '{"job":"","today":0,"total":1997933,"xp":5555}');
  const modal = $('#modal'), toast = $('#toast');
  const tutorials = {
    Motorista:'Siga a rota indicada, pare corretamente nos pontos e leve os passageiros até o destino. Evite colisões para manter o bônus da corrida.',
    Minerador:'Vá até a mina, equipe a ferramenta correta e quebre as rochas marcadas. Materiais raros valem mais e exigem mais tempo.',
    Entregador:'Retire as encomendas no distribuidor e entregue nos pontos indicados. Quanto mais rápido e cuidadoso, maior a recompensa.',
    Lixeiro:'Siga a rota de coleta, recolha os sacos marcados e leve a carga ao ponto de descarte.',
    Fazendeiro:'Plante, acompanhe a produção, recolha os fenos e faça a entrega para receber o pagamento.',
    Taxista:'Aceite chamados, busque passageiros e leve cada cliente ao destino indicado.'
  };

  function save(){ localStorage.setItem('emprego-ui', JSON.stringify(state)); }
  function money(v){ return Number(v||0).toLocaleString('pt-BR'); }
  function render(){
    $('#today').textContent = money(state.today);
    $('#total').textContent = money(state.total);
    $('#xp').textContent = state.xp;
    $('#active-job').textContent = state.job ? 'ATUAL: ' + state.job.toUpperCase() : 'SEM EMPREGO ATIVO';
    $$('.job-card').forEach(card => {
      const active = card.dataset.job === state.job;
      card.classList.toggle('active', active);
      $('.start', card).textContent = active ? 'ATIVO' : 'COMEÇAR';
    });
  }
  function showToast(msg){
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(showToast.t); showToast.t = setTimeout(()=>toast.classList.remove('show'), 1900);
  }
  function startJob(card){
    state.job = card.dataset.job;
    state.today += Math.round(Number(card.dataset.salary)/10);
    state.total += Math.round(Number(card.dataset.salary)/10);
    state.xp = Math.min(6000, state.xp + 25);
    save(); render();
    showToast(card.dataset.job + ' selecionado como emprego atual');
  }
  function openTutorial(card){
    $('#modal-title').textContent = card.dataset.job;
    $('#modal-text').textContent = tutorials[card.dataset.job] || '';
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }

  $$('.job-card').forEach(card => {
    $('.start', card).addEventListener('click', () => startJob(card));
    $('.tutorial', card).addEventListener('click', () => openTutorial(card));
  });

  $$('.task:not(.done)').forEach(task => task.addEventListener('click', () => {
    const max = Number(task.dataset.max || 1);
    let cur = Number(task.dataset.current || 0);
    if(cur < max) cur++;
    task.dataset.current = cur;
    $('.progress i', task).style.width = ((cur/max)*100) + '%';
    $('.task-foot strong', task).textContent = cur + ' /' + max;
    if(cur >= max){
      task.classList.add('done');
      $('.task-foot strong', task).textContent = 'COMPLETA';
      state.xp = Math.min(6000, state.xp + 150);
      save(); render(); showToast('Tarefa concluída');
    }
  }));

  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-ok').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
  $('#change-photo').addEventListener('click', () => showToast('Troca de foto pronta para integrar ao personagem'));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

  // Interface de jogo: nada pode ser selecionado, arrastado ou ganhar o azul de copia.
  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());

  // Scroll real dos empregos: roda do mouse desloca a fileira horizontalmente.
  const jobs = $('#jobs');
  jobs.addEventListener('wheel', e => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      jobs.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive:false });

  render();
})();