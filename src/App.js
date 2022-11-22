import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const ref = {
    brut: {
      horaire: 11.06,
      mensuel: 1678,
      annuel: 20136,
    },
    net: {
      horaire: 8.76,
      mensuel: 1329,
      annuel: 15950,
    },
  };
  const [relativeSmic, setRelativeSmic] = useState(null);
  const [options, setOptions] = useState({
    montant: null,
    netOuBrut: 'net',
    temporalite: 'horaire',
  });
  const handleChange = (event) => {
    let toReturn = { ...options, [event.target.name]: event.target.value };
    setOptions(toReturn);
  };

  const calcRelative = () => {
    let transit = ref[options.netOuBrut];
    if (options.montant === null) setRelativeSmic(0);
    else
      setRelativeSmic(
        (options.montant / transit[options.temporalite]).toFixed(2)
      );
  };

  useEffect(() => {
    calcRelative();
  }, [options]);
  return (
    <div className='app'>
      <div className='displayTotal'>
        <input
          type='text'
          onChange={handleChange}
          name='montant'
          placeholder='Montant €'
        />{' '}
        ça fait {relativeSmic} SMIC {options.temporalite} {options.netOuBrut}
      </div>
      <div className='options'>
        <div>
          C'est du{' '}
          <select id='netOuBrut' name='netOuBrut' onChange={handleChange}>
            <option value='net'>Net</option>
            <option value='brut'>Brut</option>
          </select>
          <select id='temporalite' name='temporalite' onChange={handleChange}>
            <option value='horaire'>Horaire</option>
            <option value='mensuel'>Mensuel</option>
            <option value='annuel'>Annuel</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;
