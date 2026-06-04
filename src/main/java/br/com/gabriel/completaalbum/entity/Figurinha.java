package br.com.gabriel.completaalbum.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "figurinhas")
public class Figurinha {

    @Id
    @Column(nullable = false, length = 10)
    private String codigo;

    @Column(nullable = false, length = 50)
    private String secao;

    @Column(nullable = false)
    private Integer ordem;

    @Column(nullable = false)
    private Boolean obtida = false;

    public Figurinha() {
    }

    public Figurinha(String codigo, String secao, Integer ordem, Boolean obtida) {
        this.codigo = codigo;
        this.secao = secao;
        this.ordem = ordem;
        this.obtida = false;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getSecao() {
        return secao;
    }

    public void setSecao(String secao) {
        this.secao = secao;
    }

    public Integer getOrdem() {
        return ordem;
    }

    public void setOrdem(Integer ordem) {
        this.ordem = ordem;
    }

    public Boolean getObtida() {
        return obtida;
    }

    public void setObtida(Boolean obtida) {
        this.obtida = obtida;
    }
}
