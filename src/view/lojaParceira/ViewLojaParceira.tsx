"use client";

import { useLojaParceiraApi } from "@/api/UseLojaParceiraApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { IconApp } from "@/components/Icon/IconApp";
import { ImageApp } from "@/components/Image/ImageApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { TextApp } from "@/components/Text/TextApp";
import { ILojasParceiras } from "@/types/LojaParceira";
import { IPaginacaoResponse } from "@/types/PaginacaoResponse";
import { maskPhone } from "@/utils/MaskPhone";
import {
  Grid,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Card,
  Pagination,
  CardContent,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";

export function ViewLojaParceira() {
  const { paginacaoLojasParceiras } = useLojaParceiraApi();
  const [skip, setSkip] = useState(1);
  const [paginacao, setPaginacao] = useState<
    IPaginacaoResponse<ILojasParceiras>
  >({
    totalDeRegistros: 0,
    totalPaginas: 0,
    values: [],
  });

  async function init() {
    const response = await paginacaoLojasParceiras.fetch(skip);
    if (response) {
      setPaginacao(response);
    }
  }

  useEffect(() => {
    init();
  }, [skip]);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSkip(value);
  };

  function getConfig(color: string) {
    return {
      color,
      display: "flex",
      gap: 2,
    };
  }

  if (paginacaoLojasParceiras.status === "loading") {
    return <LoadingApp height="350px" width="100%" />;
  }

  return (
    <>
      <Grid container spacing={6} sx={{ marginTop: "5rem", padding: "1rem" }}>
        {paginacao.values.map((loja, i) => (
          <Grid size={{ xs: 12, sm: 6 }} key={i}>
            <Card>
              {loja.foto && (
                <BoxApp
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ImageApp
                    height={300}
                    width={300}
                    alt={loja.nome}
                    src={loja.foto ?? ""}
                  />
                </BoxApp>
              )}
              <CardContent>
                <TextApp titulo={loja.nome} fontSize="18px" fontWeight={600} />
              </CardContent>
              <Divider variant="middle" />
              <CardContent>
                {loja.contato && (
                  <TextApp titulo={`Contato: ${maskPhone(loja.contato)}`} />
                )}
                <Box display="flex" flexDirection="column" alignItems="start">
                  {loja.facebook && (
                    <Tooltip title="Abrir facabook" placement="right">
                      <IconButton
                        href={loja.facebook}
                        sx={getConfig("#497ce2")}
                        target="_blank"
                      >
                        <Typography variant="body2" color="text.secondary">
                          Facebook :{" "}
                        </Typography>
                        <IconApp icon="mdi:facebook" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {loja.instagram && (
                    <Tooltip title="Abrir instagram" placement="right">
                      <IconButton
                        href={loja.instagram}
                        sx={getConfig("#db4437")}
                        target="_blank"
                      >
                        <Typography variant="body2" color="text.secondary">
                          Instagram :{" "}
                        </Typography>
                        <IconApp icon="mdi:instagram" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {loja.endereco && (
                    <Tooltip title="Abrir localização" placement="right">
                      <IconButton
                        href={`https://www.google.com/maps/search/?api=1&query=${loja.endereco.replace(
                          / /g,
                          "+"
                        )}`}
                        sx={getConfig("#db4437")}
                        target="_blank"
                      >
                        <Typography variant="body2" color="text.secondary">
                          Localização : {loja.endereco}
                        </Typography>
                        <IconApp icon="entypo:location" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <BoxApp
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="1rem"
      >
        <Pagination
          count={paginacao.totalPaginas}
          page={skip}
          onChange={handleChangePagination}
          variant="outlined"
          shape="rounded"
        />
      </BoxApp>
    </>
  );
}
