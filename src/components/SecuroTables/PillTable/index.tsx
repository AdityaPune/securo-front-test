import * as React from 'react';
import { Grid, Button, Box, Card, GridSize } from '@mui/material';
import './style.scss';

interface Header {
  key: string;
  title?: string;
  width?: GridSize;
  class?: string;
  rowStyle?: React.CSSProperties;
}

interface Options {
  showBorder?: boolean;
  rowClick?: Function;
}

function PillTable({
  headers,
  data,
  options,
}: {
  headers: Header[];
  data: any[];
  options?: Options;
}) {
  function getValue(obj: any, headerKey: string) {
    const value = obj[headerKey] || '';
    return typeof value === 'function' ? value() : value;
  }

  function rowClick(obj: any) {
    return options && options.rowClick ? options.rowClick(obj) : null;
  }

  return (
    <div>
      <Grid
        container
        className="pill-table-row"
      >
        {headers.length &&
          headers.map((header: Header) => {
            return (
              <Grid
                item
                xs={header.width}
                className={header.class}
                key={header.key}
              >
                <div className="pill-table-header--text">{header.title}</div>
              </Grid>
            );
          })}
      </Grid>

      {data.map((obj, index: number) => {
        return (
          <Grid
            container
            className="pill-table-row"
            key={index}
            onClick={() => rowClick(obj)}
          >
            {headers.map((header: Header, headerIndex: number) => {
              return (
                <Grid
                  item
                  xs={header.width}
                  key={`${index}-${headerIndex}`}
                  style={header.rowStyle}
                >
                  <div>{getValue(obj, header.key)}</div>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </div>
  );
}

export default PillTable;
