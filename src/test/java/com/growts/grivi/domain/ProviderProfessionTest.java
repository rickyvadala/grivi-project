package com.growts.grivi.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.growts.grivi.web.rest.TestUtil;

public class ProviderProfessionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProviderProfession.class);
        ProviderProfession providerProfession1 = new ProviderProfession();
        providerProfession1.setId(1L);
        ProviderProfession providerProfession2 = new ProviderProfession();
        providerProfession2.setId(providerProfession1.getId());
        assertThat(providerProfession1).isEqualTo(providerProfession2);
        providerProfession2.setId(2L);
        assertThat(providerProfession1).isNotEqualTo(providerProfession2);
        providerProfession1.setId(null);
        assertThat(providerProfession1).isNotEqualTo(providerProfession2);
    }
}
