package br.com.gabriel.completaalbum.dto;

public class ProgressoResponse {

    private long obtidas;
    private long faltantes;
    private long total;
    private double percentual;

    public ProgressoResponse(long obtidas, long faltantes, long total, double percentual) {
        this.obtidas = obtidas;
        this.faltantes = faltantes;
        this.total = total;
        this.percentual = percentual;
    }

    public long getObtidas() {
        return obtidas;
    }

    public long getFaltantes() {
        return faltantes;
    }

    public long getTotal() {
        return total;
    }

    public double getPercentual() {
        return percentual;
    }
}
