import React from 'react';
import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import style from "./App.module.css";
import ColorTable from './components/Table/ColorTable';
import { IColorListFullDetail, ISearch } from './utils/interfaces';
import InputSearch from './components/Input/InputSearch';
import { getAllColorsAPI } from './utils/api';

function App() {
  const [list, setList] = useState<IColorListFullDetail>();
  const [search, setSearch] = useState<ISearch>({ hex: "", pickerValue: "#000000" });

  const getColorInfo = async () => {
    const colorInfo: any = await getAllColorsAPI();
    setList({ list: colorInfo, sorted: [] });
  }

  useEffect(() => {
    getColorInfo();
  }, []);

  return (
    <div className={`${style.main}`}>
      <Row>
        <Col lg="12" md="12" sm="12">
          <h2>Colour Searcher</h2>
          <InputSearch
            search={search}
            setSearch={setSearch}
            list={list!}
            setList={setList}
            getColorInfo={getColorInfo}
          />
          {list?.list !== undefined ?
            <ColorTable
              searchingText={search.hex}
              columnList={['', 'Name', 'Hex', 'RGB', 'HSL']}
              colorList={list!}
            />
            :
            <div className={style.App__loaderContainer}>
              <div className={style.App__loadingList}>Loading...</div>
              <Spinner>
              </Spinner>
            </div>
          }
        </Col>
      </Row>
    </div>
  );
}

export default App;
