import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import mapDataBR from '@highcharts/map-collection/countries/br/br-all.topo.json';
highchartsMap(Highcharts);

import API from '../../lib/axios.jsx';
import {
  CircleWavyCheck,
  CurrencyCircleDollar,
  FileArrowUp,
  Money,
  Student,
  Users,
} from 'phosphor-react';

function Transparency() {
  Highcharts.setOptions({
    lang: {
      decimalPoint: ',',
      thousandsSep: '.',
    },
  });

  const [dadosGerais, setDadosGerais] = useState();
  const [usuariosPorCurso, setUsuariosPorCurso] = useState([]);
  const [usuariosPorEstado, setUsuariosPorEstado] = useState([]);

  const options = useMemo(() => {
    return {
      chart: {
        type: 'pie',
        backgroundColor: '#f3f4f6',
        plotBorderWidth: '0',
        plotShadow: false,
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      series: [
        {
          name: 'Usuários',
          data: usuariosPorCurso.map((item) => {
            return { name: item.curso, y: item.usuarios };
          }),
        },
      ],
    };
  }, [usuariosPorCurso]);

  const optionsMap = useMemo(() => {
    return {
      chart: {
        map: mapDataBR,
        backgroundColor: '#f3f4f6',
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      subtitle: {
        text: '',
      },
      mapNavigation: {
        enabled: false,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },

      colorAxis: {
        min: 0,
        minColor: '#FFEEF2',
        maxColor: '#D16FFF',
      },
      series: [
        {
          data: usuariosPorEstado.map((item) => [
            `br-${item.estados.toLowerCase()}`,
            item.usuarios_totais,
          ]),
          name: 'Usuários',
          states: {
            hover: {
              color: '#C14FFF',
            },
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            pointFormat: '{point.name}: {point.value}',
          },
        },
      ],
    };
  }, [usuariosPorEstado]);

  useEffect(() => {
    const carregarDados = async () => {
      const { data } = await API.get(`/transparecia`);
      setDadosGerais(data.dados_gerais);
      setUsuariosPorCurso(data.usuarios_por_curso);
      setUsuariosPorEstado(data.usuarios_por_estado);
    };

    carregarDados();
  }, []);

  return (
    <main className="w-[100%] max-w-[69.375rem] mx-auto mt-[1.875rem] / 1200:w-[80%]">
      <nav>
        <Link to="/" className="text-[#808080] text-[1rem] font-semibold">
          Início{' '}
        </Link>
        <Link to="/transparencia" className="text-[1rem] font-bold">
          / Transparência
        </Link>
      </nav>
      <section>
        <h1 className="text-center mt-[1.875rem] text-[2.5rem] font-semibold text-primaryColor_2">
          Transparência
        </h1>
        <div className="grid bg-[#F5F5F7] rounded-[1.25rem] mt-[1.875rem] p-4 drop-shadow-md">
          <h2 className="mt-[1.875rem] text-center text-[1.5625rem] font-semibold text-primaryColor_2">
            Dados Gerais
          </h2>
          <div className="grid grid-cols-4 justify-between gap-[1rem] px-[1rem] mt-[1.875rem] / 1200:grid-cols-2 / tablet:grid-cols-1">
            <div className="grid place-items-center">
              <div className="flex gap-[0.61125rem] items-center">
                <Users
                  size={22}
                  className="text-primaryColor_2"
                  weight="fill"
                />
                <span className="font-bold">Total de usuários registrados</span>
              </div>
              <span className="mt-[1rem] text-[1.875rem] font-semibold text-primaryColor_2">
                {dadosGerais?.usuarios_registrados}
              </span>
            </div>
            <div className="grid place-items-center">
              <div className="flex gap-[0.61125rem] items-center">
                <FileArrowUp
                  size={22}
                  className="text-primaryColor_2"
                  weight="fill"
                />
                <span className="font-bold">Inscrições realizadas</span>
              </div>
              <span className="mt-[1rem] text-[1.875rem] font-semibold text-primaryColor_2">
                {dadosGerais?.incricoes_realizadas}
              </span>
            </div>
            <div className="grid place-items-center">
              <div className="flex gap-[0.61125rem] items-center">
                <Student
                  size={22}
                  className="text-primaryColor_2"
                  weight="fill"
                />
                <span className="font-bold">Alunos Ativos</span>
              </div>
              <span className="mt-[1rem] text-[1.875rem] font-semibold text-primaryColor_2">
                {dadosGerais?.cursos_ativos}
              </span>
            </div>
            <div className="grid place-items-center">
              <div className="flex gap-[0.61125rem] items-center">
                <CircleWavyCheck
                  size={22}
                  className="text-primaryColor_2"
                  weight="fill"
                />
                <span className="font-bold">Direito à Certificação</span>
              </div>
              <span className="mt-[1rem] text-[1.875rem] font-semibold text-primaryColor_2">
                {dadosGerais?.direito_certificacao}
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-[2.4375rem] mt-[1.875rem] mb-[2.8125rem] / tablet:flex-col">
            <div className="grid place-items-center">
              <div className="flex gap-[0.61125rem] items-center">
                <Money
                  size={22}
                  className="text-primaryColor_2"
                  weight="fill"
                />
                <span className="font-bold">Investimento médio por curso</span>
              </div>
              <span className="mt-[1rem] text-[1.875rem] font-semibold text-primaryColor_2">
                {dadosGerais?.investimento_medio_curso}
              </span>
            </div>
            <div className="grid place-items-center">
              <div className="flex gap-[0.61125rem] items-center">
                <CurrencyCircleDollar
                  size={22}
                  className="text-primaryColor_2"
                  weight="fill"
                />
                <span className="font-bold">Investimento médio por aluno</span>
              </div>
              <span className="mt-[1rem] text-[1.875rem] font-semibold text-primaryColor_2">
                {dadosGerais?.investimento_medio_aluno}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[1.875rem] mt-[1.875rem] mb-[6.25rem] / 1200:grid-cols-1">
          <div className="flex flex-col items-center justify-content rounded-2xl bg-gray-100 p-4 drop-shadow-md">
            <h1 className="text-xl text-primaryColor_2 mb-4 font-semibold text-center">
              Usuários por curso
            </h1>
            <div className="w-full">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-content rounded-2xl bg-gray-100 p-4 drop-shadow-md">
            <h1 className="text-xl text-primaryColor_2 mb-4 font-semibold text-center">
              Usuários por Estado
            </h1>
            <div className="w-full">
              <HighchartsReact
                constructorType={'mapChart'}
                highcharts={Highcharts}
                options={optionsMap}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Transparency;
