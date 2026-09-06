package br.com.gabriel.completaalbum.service;

import br.com.gabriel.completaalbum.dto.ProgressoResponse;
import br.com.gabriel.completaalbum.entity.Figurinha;
import br.com.gabriel.completaalbum.repository.FigurinhaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FigurinhaServiceTest {

    @Mock
    private FigurinhaRepository repository;

    private FigurinhaService service;

    @BeforeEach
    void setUp() {
        service = new FigurinhaService(repository);
    }

    @Test
    void deveRetornarProgressoZeroQuandoNaoHaFigurinhas() {
        when(repository.countByObtida(true)).thenReturn(0L);
        when(repository.count()).thenReturn(0L);

        ProgressoResponse response = service.obterProgresso();

        assertEquals(0L, response.getObtidas());
        assertEquals(0L, response.getFaltantes());
        assertEquals(0L, response.getTotal());
        assertEquals(0.0, response.getPercentual());
    }

    @Test
    void deveAlternarStatusDaFigurinha() {
        Figurinha figurinha = new Figurinha("BR1", "Brasil", 1);
        figurinha.setObtida(false);

        when(repository.findById("BR1")).thenReturn(Optional.of(figurinha));
        when(repository.save(figurinha)).thenReturn(figurinha);

        Figurinha atualizada = service.alternarObtida("BR1");

        assertTrue(atualizada.getObtida());
    }

    @Test
    void deveResetarTodasAsFigurinhas() {
        Figurinha figurinha = new Figurinha("BR1", "Brasil", 1);
        figurinha.setObtida(true);

        when(repository.findAll()).thenReturn(List.of(figurinha));
        when(repository.saveAll(List.of(figurinha))).thenReturn(List.of(figurinha));

        List<Figurinha> atualizadas = service.resetarAlbum();

        assertFalse(atualizadas.get(0).getObtida());
    }

    @Test
    void deveMarcarTodasAsFigurinhasComoObtidas() {
        Figurinha figurinha = new Figurinha("BR1", "Brasil", 1);
        figurinha.setObtida(false);

        when(repository.findAll()).thenReturn(List.of(figurinha));
        when(repository.saveAll(List.of(figurinha))).thenReturn(List.of(figurinha));

        List<Figurinha> atualizadas = service.marcarTudoComoObtido();

        assertTrue(atualizadas.get(0).getObtida());
    }
}
