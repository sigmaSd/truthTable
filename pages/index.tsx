/** @jsx h */
import { h, PageConfig, useState } from "../deps.ts";

export const config: PageConfig = { runtimeJS: true };
export default function Home() {
  const [table, setTable] = useState([] as Row[]);

  return (
    <div>
      <input
        onChange={(ev) => {
          setTable(parse((ev.target as HTMLInputElement)!.value));
        }}
      />
      {table[0] ? <Table table={table} /> : ""}
    </div>
  );
}

function Table(
  props: {
    table: Row[];
  },
) {
  const table = props.table;

  const Header = () => {
    const style = { color: "blue" };
    return (
      <tr style={style}>
        {Object.keys(table[0].param).map((col) => {
          return <td>{col}</td>;
        })}
        <td style={{ color: "#221" }}>Result</td>
      </tr>
    );
  };

  return (
    <div>
      <table>
        <Header />

        {table.map((row) => {
          const style = (val: string | number) => {
            return { color: val.toString() === "0" ? "red" : "green" };
          };
          return (
            <tr>
              {Object.keys(row.param).map((col) => {
                const val = row.param[col];
                return <td style={style(val)}>{val}</td>;
              })}
              <td style={style(row.result)}>{row.result}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

type Row = { result: string | number; param: { [string: string]: number } };

function parse(value: string) {
  const results: Row[] = [];
  function rec(
    value: string,
    idx: number,
    param: { [string: string]: number },
  ) {
    const char = String.fromCharCode(idx);
    if (idx < 123) {
      if (value.includes(char)) {
        const a = value.replace(char, "0");
        const b = value.replace(char, "1");
        const paramA = { ...param };
        const paramB = { ...param };
        paramA[char] = 0;
        paramB[char] = 1;
        rec(a, idx + 1, paramA);
        rec(b, idx + 1, paramB);
      } else {
        rec(value, idx + 1, param);
      }
    } else {
      results.push({
        result: eval(value),
        param,
      });
    }
  }
  rec(value, 97, {});

  return results;
}
