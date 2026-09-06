package br.com.gabriel.completaalbum.controller;

import br.com.gabriel.completaalbum.entity.Figurinha;
import br.com.gabriel.completaalbum.service.FigurinhaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import br.com.gabriel.completaalbum.dto.ProgressoResponse;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@RestController
public class FigurinhaController {

    private final FigurinhaService service;

    public FigurinhaController(FigurinhaService service) {
        this.service = service;
    }

    @Operation(
            summary = "Lista todas as figurinhas do álbum"
    )
    @GetMapping("/figurinhas")
    public List<Figurinha> listarTodas() {
        return service.listarTodas();
    }

    @Operation(
            summary = "Lista as figurinhas obtidas do álbum"
    )
    @GetMapping("/figurinhas/obtidas")
    public List<Figurinha> listarObtidas() {
        return service.listarObtidas();
    }

    @Operation(
            summary = "Lista as figurinhas faltantes do álbum"
    )
    @GetMapping("/figurinhas/faltantes")
    public List<Figurinha> listarFaltantes() {
        return service.listarFaltantes();
    }

    @Operation(
            summary = "Alterna o status da figurinha"
    )
    @PatchMapping("/figurinhas/{codigo}")
    public Figurinha alternarObtida(
            @PathVariable String codigo
    ) {
        return service.alternarObtida(codigo);
    }

    @Operation(
            summary = "Marca todas as figurinhas como obtidas"
    )
    @PatchMapping("/figurinhas/marcar-todas")
    public List<Figurinha> marcarTudoComoObtido() {
        return service.marcarTudoComoObtido();
    }

    @Operation(
            summary = "Reseta todas as figurinhas do álbum"
    )
    @PatchMapping("/figurinhas/resetar")
    public List<Figurinha> resetarAlbum() {
        return service.resetarAlbum();
    }

    @Operation(
            summary = "Mostra o progresso do álbum"
    )
    @GetMapping("/figurinhas/progresso")
    public ProgressoResponse obterProgresso() {
        return service.obterProgresso();
    }

    @Operation(
            summary = "Busca a figurinha do álbum por código"
    )
    @GetMapping("/figurinhas/{codigo}")
    public Figurinha buscarPorCodigo(
            @PathVariable String codigo
    ) {
        return service.buscarPorCodigo(codigo);
    }

    @Operation(
            summary = "Lista as figurinhas faltantes do álbum por seção"
    )
    @GetMapping("/figurinhas/secao/{secao}")
    public List<Figurinha> listarPorSecao(
            @PathVariable String secao
    ) {
        return service.listarPorSecao(secao);
    }



}
